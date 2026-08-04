import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { openDatabase, CATEGORIES } from "./db.js";
import { createPasswordRecord, verifyPassword, validatePassword, createSessionToken, hashToken } from "./security.js";
import { analyzeSpendingTrend } from "../src/expenseManager.js";

const ROOT = resolve(fileURLToPath(new URL("../src/", import.meta.url)));
const MIME = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".png":"image/png", ".svg":"image/svg+xml", ".json":"application/json; charset=utf-8" };

function json(res, status, body, extra={}) {
  const data = JSON.stringify(body);
  res.writeHead(status, { "Content-Type":"application/json; charset=utf-8", "Content-Length":Buffer.byteLength(data), "Cache-Control":"no-store", ...extra });
  res.end(data);
}
function error(res, status, message, details=[]) { json(res, status, { success:false, message, errors:details }); }
async function body(req) {
  let raw="";
  for await (const chunk of req) { raw += chunk; if (raw.length > 1_000_000) throw new Error("Request body is too large."); }
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { throw new Error("Request body must be valid JSON."); }
}
function emailValid(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value||"").trim()); }
function monthValid(value) { return /^\d{4}-(0[1-9]|1[0-2])$/.test(String(value||"")); }
function dateValid(value) { return /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/.test(String(value||"")) && !Number.isNaN(Date.parse(value)); }
function cents(value) { const n=Number(value); return Number.isFinite(n) ? Math.round(n*100) : NaN; }
function publicUser(row) { return { userId:row.user_id, name:row.name, email:row.email, role:row.role, status:row.status, createdAt:row.created_at }; }

function authenticate(req, db) {
  const header=req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return null;
  const token=header.slice(7);
  const row=db.prepare(`SELECT u.* FROM sessions s JOIN users u ON u.user_id=s.user_id
                        WHERE s.token_hash=? AND s.expires_at>datetime('now') AND u.status='active'`).get(hashToken(token));
  return row ? { token, ...publicUser(row) } : null;
}
function requireUser(req,res,db) { const u=authenticate(req,db); if(!u) error(res,401,"Authentication required."); return u; }
function requireAdmin(req,res,db) { const u=requireUser(req,res,db); if(!u) return null; if(u.role!=="admin"){error(res,403,"Administrator access required.");return null;} return u; }

function expenseRow(row) { return { expenseId:row.expense_id, title:row.title, amount:row.amount_cents/100, category:row.category, date:row.expense_date }; }
function validateExpense(input) {
  const errors=[]; const title=String(input.title||"").trim(); const amountCents=cents(input.amount); const category=String(input.category||"").trim(); const date=String(input.date||"").trim();
  if(!title) errors.push("Expense title is required.");
  if(!Number.isInteger(amountCents)||amountCents<=0) errors.push("Expense amount must be greater than zero.");
  if(!CATEGORIES.includes(category)) errors.push("Expense category is invalid.");
  if(!dateValid(date)) errors.push("Valid expense date is required.");
  return { errors,title,amountCents,category,date };
}
function monthlyRows(db,userId){return db.prepare(`SELECT substr(expense_date,1,7) month, SUM(amount_cents) total_cents
  FROM expenses WHERE user_id=? GROUP BY substr(expense_date,1,7) ORDER BY month`).all(userId).map(r=>({month:r.month,total:r.total_cents/100}));}

export function createRequestHandler(db) {
  return async (req,res) => {
    res.setHeader("X-Content-Type-Options","nosniff");
    res.setHeader("X-Frame-Options","DENY");
    res.setHeader("Referrer-Policy","no-referrer");
    res.setHeader("Content-Security-Policy","default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
    const url=new URL(req.url,"http://localhost"); const path=url.pathname;
    try {
      if(path==="/api/health" && req.method==="GET") return json(res,200,{success:true,status:"ok",database:"SQLite"});
      if(path==="/api/auth/register" && req.method==="POST") {
        const input=await body(req); const name=String(input.name||"").trim(); const email=String(input.email||"").trim().toLowerCase(); const password=String(input.password||"");
        const errors=[]; if(name.length<2) errors.push("Name must contain at least 2 characters."); if(!emailValid(email)) errors.push("A valid email address is required."); errors.push(...validatePassword(password));
        if(errors.length) return error(res,400,"Registration validation failed.",errors);
        if(db.prepare("SELECT 1 FROM users WHERE email=?").get(email)) return error(res,409,"Email is already registered.");
        const {salt,hash}=createPasswordRecord(password); const result=db.prepare(`INSERT INTO users(name,email,password_hash,password_salt,role,status) VALUES (?,?,?,?, 'user','active')`).run(name,email,hash,salt);
        return json(res,201,{success:true,user:{userId:Number(result.lastInsertRowid),name,email,role:"user",status:"active"}});
      }
      if(path==="/api/auth/login" && req.method==="POST") {
        const input=await body(req); const email=String(input.email||"").trim().toLowerCase(); const password=String(input.password||"");
        if(!emailValid(email)||!password) return error(res,400,"Email and password are required.");
        const row=db.prepare("SELECT * FROM users WHERE email=?").get(email);
        if(!row || row.status!=="active" || !verifyPassword(password,row.password_salt,row.password_hash)) return error(res,401,"Invalid email or password.");
        const token=createSessionToken(); const expires=new Date(Date.now()+8*60*60*1000).toISOString();
        db.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES (?,?,?)").run(hashToken(token),row.user_id,expires);
        return json(res,200,{success:true,token,expiresAt:expires,user:publicUser(row)});
      }
      if(path==="/api/auth/logout" && req.method==="POST") { const u=requireUser(req,res,db); if(!u)return; db.prepare("DELETE FROM sessions WHERE token_hash=?").run(hashToken(u.token)); return json(res,200,{success:true}); }
      if(path==="/api/auth/me" && req.method==="GET") { const u=requireUser(req,res,db); if(!u)return; return json(res,200,{success:true,user:u}); }

      if(path==="/api/expenses" && req.method==="GET") { const u=requireUser(req,res,db); if(!u)return; const category=url.searchParams.get("category"); let rows;
        if(category) rows=db.prepare("SELECT * FROM expenses WHERE user_id=? AND category=? ORDER BY expense_date DESC, expense_id DESC").all(u.userId,category);
        else rows=db.prepare("SELECT * FROM expenses WHERE user_id=? ORDER BY expense_date DESC, expense_id DESC").all(u.userId);
        return json(res,200,{success:true,expenses:rows.map(expenseRow)}); }
      if(path==="/api/expenses" && req.method==="POST") { const u=requireUser(req,res,db); if(!u)return; const v=validateExpense(await body(req)); if(v.errors.length)return error(res,400,"Expense validation failed.",v.errors);
        const result=db.prepare("INSERT INTO expenses(user_id,title,amount_cents,category,expense_date) VALUES (?,?,?,?,?)").run(u.userId,v.title,v.amountCents,v.category,v.date);
        const row=db.prepare("SELECT * FROM expenses WHERE expense_id=?").get(result.lastInsertRowid); return json(res,201,{success:true,expense:expenseRow(row)}); }
      const expenseMatch=path.match(/^\/api\/expenses\/(\d+)$/);
      if(expenseMatch && req.method==="PUT") { const u=requireUser(req,res,db); if(!u)return; const id=Number(expenseMatch[1]); const current=db.prepare("SELECT * FROM expenses WHERE expense_id=? AND user_id=?").get(id,u.userId); if(!current)return error(res,404,"Expense record was not found.");
        const input=await body(req); const v=validateExpense({title:input.title??current.title,amount:input.amount??current.amount_cents/100,category:input.category??current.category,date:input.date??current.expense_date}); if(v.errors.length)return error(res,400,"Expense validation failed.",v.errors);
        db.prepare("UPDATE expenses SET title=?,amount_cents=?,category=?,expense_date=?,updated_at=CURRENT_TIMESTAMP WHERE expense_id=? AND user_id=?").run(v.title,v.amountCents,v.category,v.date,id,u.userId);
        return json(res,200,{success:true,expense:expenseRow(db.prepare("SELECT * FROM expenses WHERE expense_id=?").get(id))}); }
      if(expenseMatch && req.method==="DELETE") { const u=requireUser(req,res,db); if(!u)return; const result=db.prepare("DELETE FROM expenses WHERE expense_id=? AND user_id=?").run(Number(expenseMatch[1]),u.userId); if(!result.changes)return error(res,404,"Expense record was not found."); return json(res,200,{success:true}); }

      if(path==="/api/budget" && req.method==="PUT") { const u=requireUser(req,res,db); if(!u)return; const input=await body(req); const month=String(input.month||""); const limitCents=cents(input.limit); if(!monthValid(month)||!Number.isInteger(limitCents)||limitCents<=0)return error(res,400,"A valid month and positive budget limit are required.");
        db.prepare(`INSERT INTO monthly_budgets(user_id,month,limit_cents) VALUES (?,?,?)
          ON CONFLICT(user_id,month) DO UPDATE SET limit_cents=excluded.limit_cents,updated_at=CURRENT_TIMESTAMP`).run(u.userId,month,limitCents);
        return json(res,200,{success:true,budget:{month,monthlyLimit:limitCents/100}}); }
      if(path==="/api/budget/status" && req.method==="GET") { const u=requireUser(req,res,db); if(!u)return; const month=url.searchParams.get("month"); if(!monthValid(month))return error(res,400,"Valid month is required."); const b=db.prepare("SELECT limit_cents FROM monthly_budgets WHERE user_id=? AND month=?").get(u.userId,month); if(!b)return error(res,404,"No budget is set for the selected month."); const spent=db.prepare("SELECT COALESCE(SUM(amount_cents),0) total FROM expenses WHERE user_id=? AND substr(expense_date,1,7)=?").get(u.userId,month).total; const limit=b.limit_cents; const status=spent>limit?"over":spent>=limit*.8?"warning":"safe"; return json(res,200,{success:true,status:{month,status,alert:status!=="safe",spent:spent/100,limit:limit/100,remaining:(limit-spent)/100,message:status==="over"?"Budget exceeded.":status==="warning"?"Budget is close to the monthly limit.":"Budget is within the safe range."}}); }

      if(path==="/api/reports/monthly" && req.method==="GET") { const u=requireUser(req,res,db); if(!u)return; const month=url.searchParams.get("month"); if(!monthValid(month))return error(res,400,"Valid month is required."); const rows=db.prepare("SELECT * FROM expenses WHERE user_id=? AND substr(expense_date,1,7)=? ORDER BY expense_date").all(u.userId,month); const categoryTotals={}; let total=0; for(const r of rows){total+=r.amount_cents;categoryTotals[r.category]=(categoryTotals[r.category]||0)+r.amount_cents/100;} const topCategory=Object.entries(categoryTotals).sort((a,b)=>b[1]-a[1])[0]?.[0]||null; return json(res,200,{success:true,report:{month,expenseCount:rows.length,totalSpent:total/100,categoryTotals,topCategory,expenses:rows.map(expenseRow)}}); }
      if(path==="/api/reports/trend" && req.method==="GET") { const u=requireUser(req,res,db); if(!u)return; const totals=monthlyRows(db,u.userId); return json(res,200,{success:true,monthlyTotals:totals,trend:analyzeSpendingTrend(totals)}); }

      if(path==="/api/admin/users" && req.method==="GET") { const a=requireAdmin(req,res,db); if(!a)return; const rows=db.prepare("SELECT * FROM users ORDER BY user_id").all(); return json(res,200,{success:true,users:rows.map(publicUser)}); }
      const userMatch=path.match(/^\/api\/admin\/users\/(\d+)$/);
      if(userMatch && req.method==="PATCH") { const a=requireAdmin(req,res,db); if(!a)return; const id=Number(userMatch[1]); if(id===a.userId)return error(res,400,"The current administrator account cannot modify its own role or status."); const input=await body(req); const role=String(input.role||""); const status=String(input.status||""); if(!["user","admin"].includes(role)||!["active","disabled"].includes(status))return error(res,400,"Valid role and status are required."); const result=db.prepare("UPDATE users SET role=?,status=? WHERE user_id=?").run(role,status,id); if(!result.changes)return error(res,404,"User account was not found."); return json(res,200,{success:true}); }
      if(userMatch && req.method==="DELETE") { const a=requireAdmin(req,res,db); if(!a)return; const id=Number(userMatch[1]); if(id===a.userId)return error(res,400,"The current administrator account cannot be deleted."); const result=db.prepare("DELETE FROM users WHERE user_id=?").run(id); if(!result.changes)return error(res,404,"User account was not found."); return json(res,200,{success:true}); }

      if(path==="/api/feedback" && req.method==="POST") { const a=requireAdmin(req,res,db); if(!a)return; const input=await body(req); const iteration=Number(input.iteration); const reviewer=String(input.reviewer||"").trim(); const outcome=String(input.outcome||""); const comments=String(input.comments||"").trim(); if(![1,2,3].includes(iteration)||!reviewer||!["accepted","accepted_with_changes","rejected"].includes(outcome)||!comments)return error(res,400,"Complete acceptance feedback fields are required."); const result=db.prepare("INSERT INTO acceptance_feedback(iteration,reviewer,outcome,comments) VALUES (?,?,?,?)").run(iteration,reviewer,outcome,comments); return json(res,201,{success:true,feedbackId:Number(result.lastInsertRowid)}); }
      if(path==="/api/feedback" && req.method==="GET") { const a=requireAdmin(req,res,db); if(!a)return; return json(res,200,{success:true,feedback:db.prepare("SELECT * FROM acceptance_feedback ORDER BY created_at DESC").all()}); }

      if(path.startsWith("/api/")) return error(res,404,"API route was not found.");
      let relative=path==="/"?"index.html":decodeURIComponent(path.slice(1)); relative=normalize(relative).replace(/^(\.\.(\/|\\|$))+/,""); const file=join(ROOT,relative); if(!file.startsWith(ROOT)) return error(res,403,"Forbidden.");
      try { const s=await stat(file); if(!s.isFile())throw new Error(); const data=await readFile(file); res.writeHead(200,{"Content-Type":MIME[extname(file)]||"application/octet-stream","Content-Length":data.length,"Cache-Control":"no-cache"}); res.end(data); } catch { const data=await readFile(join(ROOT,"index.html")); res.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Content-Length":data.length}); res.end(data); }
    } catch (e) { console.error(e); error(res,500,"Unexpected server error.",[e.message]); }
  };
}

export function startServer({ databasePath=process.env.DB_PATH||"data/expense-tracker.sqlite", port=Number(process.env.PORT||3000), host=process.env.HOST||"127.0.0.1" }={}) {
  const db=openDatabase(databasePath); const server=http.createServer(createRequestHandler(db));
  return new Promise((resolvePromise,reject)=>{server.once("error",reject);server.listen(port,host,()=>resolvePromise({server,db,address:server.address()}));});
}

if (process.argv[1] && resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url))) {
  const {address}=await startServer(); console.log(`Smart Expense Tracker running at http://${address.address}:${address.port}`); console.log("Demo admin: admin@example.com / Admin123!");
}

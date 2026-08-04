import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { startServer } from "../server/server.js";

const dir=mkdtempSync(join(tmpdir(),"cp3407-")); const dbPath=join(dir,"test.sqlite");
const app=await startServer({databasePath:dbPath,port:0,host:"127.0.0.1"}); const base=`http://127.0.0.1:${app.address.port}`;
async function request(path,{method="GET",token,body}={}){const r=await fetch(base+path,{method,headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{})},body:body?JSON.stringify(body):undefined});const data=await r.json();return {status:r.status,data}}
async function login(email,password){const r=await request("/api/auth/login",{method:"POST",body:{email,password}});return r.data.token}
let userToken,adminToken,expenseId,userId;

test.after(()=>{app.server.close();app.db.close();rmSync(dir,{recursive:true,force:true})});
test("US1 registration creates a database user and never stores the raw password",async()=>{const r=await request("/api/auth/register",{method:"POST",body:{name:"Student User",email:"student@example.com",password:"Student123"}});assert.equal(r.status,201);userId=r.data.user.userId;const row=app.db.prepare("SELECT password_hash,password_salt FROM users WHERE email=?").get("student@example.com");assert.notEqual(row.password_hash,"Student123");assert.ok(row.password_salt.length>10)});
test("US1 duplicate email registration is rejected",async()=>{const r=await request("/api/auth/register",{method:"POST",body:{name:"Duplicate",email:"student@example.com",password:"Student123"}});assert.equal(r.status,409)});
test("US2 secure login returns a session token",async()=>{userToken=await login("student@example.com","Student123");assert.ok(userToken?.length>20)});
test("US2 wrong password is rejected",async()=>{const r=await request("/api/auth/login",{method:"POST",body:{email:"student@example.com",password:"wrong"}});assert.equal(r.status,401)});
test("US3 authenticated user can add an expense",async()=>{const r=await request("/api/expenses",{method:"POST",token:userToken,body:{title:"Lunch",amount:12.5,category:"Food",date:"2026-08-01"}});assert.equal(r.status,201);expenseId=r.data.expense.expenseId;assert.equal(r.data.expense.amount,12.5)});
test("US4 user can edit and delete only their own expense",async()=>{let r=await request(`/api/expenses/${expenseId}`,{method:"PUT",token:userToken,body:{title:"Updated Lunch",amount:15,category:"Food",date:"2026-08-01"}});assert.equal(r.data.expense.title,"Updated Lunch");r=await request(`/api/expenses/${expenseId}`,{method:"DELETE",token:userToken});assert.equal(r.status,200)});
test("US5 category filter returns only matching expenses",async()=>{await request("/api/expenses",{method:"POST",token:userToken,body:{title:"Bus",amount:3,category:"Transport",date:"2026-08-01"}});await request("/api/expenses",{method:"POST",token:userToken,body:{title:"Dinner",amount:40,category:"Food",date:"2026-08-03"}});const r=await request("/api/expenses?category=Food",{token:userToken});assert.equal(r.data.expenses.length,1);assert.equal(r.data.expenses[0].category,"Food")});
test("US6 monthly budget is persisted in the relational database",async()=>{const r=await request("/api/budget",{method:"PUT",token:userToken,body:{month:"2026-08",limit:50}});assert.equal(r.status,200);assert.equal(r.data.budget.monthlyLimit,50)});
test("US7 budget warning is calculated from database expenses",async()=>{const r=await request("/api/budget/status?month=2026-08",{token:userToken});assert.equal(r.data.status.status,"warning");assert.equal(r.data.status.spent,43)});
test("US8 monthly report excludes expenses from another month",async()=>{await request("/api/expenses",{method:"POST",token:userToken,body:{title:"July book",amount:100,category:"Education",date:"2026-07-20"}});const r=await request("/api/reports/monthly?month=2026-08",{token:userToken});assert.equal(r.data.report.totalSpent,43);assert.equal(r.data.report.expenseCount,2)});
test("US9 spending trend sorts unordered month data before analysis",async()=>{await request("/api/expenses",{method:"POST",token:userToken,body:{title:"June",amount:5,category:"Other",date:"2026-06-10"}});const r=await request("/api/reports/trend",{token:userToken});assert.deepEqual(r.data.monthlyTotals.map(x=>x.month),["2026-06","2026-07","2026-08"]);assert.equal(r.data.trend.direction,"increasing")});
test("US10 administrator can view, disable and delete user accounts",async()=>{adminToken=await login("admin@example.com","Admin123!");let r=await request("/api/admin/users",{token:adminToken});assert.ok(r.data.users.some(u=>u.email==="student@example.com"));r=await request(`/api/admin/users/${userId}`,{method:"PATCH",token:adminToken,body:{role:"user",status:"disabled"}});assert.equal(r.status,200);const denied=await request("/api/auth/login",{method:"POST",body:{email:"student@example.com",password:"Student123"}});assert.equal(denied.status,401);r=await request(`/api/admin/users/${userId}`,{method:"DELETE",token:adminToken});assert.equal(r.status,200)});

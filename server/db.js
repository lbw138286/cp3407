import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createPasswordRecord } from "./security.js";

export const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Business", "Education", "Other"];

export function openDatabase(databasePath = process.env.DB_PATH || "data/expense-tracker.sqlite") {
  const absolute = databasePath === ":memory:" ? databasePath : resolve(databasePath);
  if (absolute !== ":memory:") mkdirSync(dirname(absolute), { recursive: true });
  const db = new DatabaseSync(absolute);
  db.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;");
  migrate(db);
  seed(db);
  return db;
}

export function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','disabled')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS categories (
      category_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS expenses (
      expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
      category TEXT NOT NULL REFERENCES categories(name),
      expense_date TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_expenses_user_date ON expenses(user_id, expense_date);
    CREATE TABLE IF NOT EXISTS monthly_budgets (
      budget_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      month TEXT NOT NULL,
      limit_cents INTEGER NOT NULL CHECK (limit_cents > 0),
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, month)
    );
    CREATE TABLE IF NOT EXISTS acceptance_feedback (
      feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
      iteration INTEGER NOT NULL CHECK (iteration BETWEEN 1 AND 3),
      reviewer TEXT NOT NULL,
      outcome TEXT NOT NULL CHECK (outcome IN ('accepted','accepted_with_changes','rejected')),
      comments TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS bugs (
      bug_id INTEGER PRIMARY KEY AUTOINCREMENT,
      external_id TEXT UNIQUE,
      linked_user_story TEXT NOT NULL,
      title TEXT NOT NULL,
      severity TEXT NOT NULL,
      status TEXT NOT NULL,
      resolution TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      closed_at TEXT
    );
  `);
}

export function seed(db) {
  const insertCategory = db.prepare("INSERT OR IGNORE INTO categories(name) VALUES (?)");
  for (const category of CATEGORIES) insertCategory.run(category);
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const exists = db.prepare("SELECT user_id FROM users WHERE email = ?").get(adminEmail);
  if (!exists) {
    const password = process.env.ADMIN_PASSWORD || "Admin123!";
    const { salt, hash } = createPasswordRecord(password);
    db.prepare(`INSERT INTO users(name,email,password_hash,password_salt,role,status)
                VALUES (?,?,?,?, 'admin','active')`).run("Admin", adminEmail, hash, salt);
  }
  db.prepare(`INSERT OR IGNORE INTO bugs(external_id,linked_user_story,title,severity,status,resolution,closed_at)
              VALUES ('BUG-003','US9','Spending trend months were not sorted chronologically','medium','done',
              'Trend analysis now sorts month keys before comparing first and last values.',CURRENT_TIMESTAMP)`).run();
}

import { openDatabase } from "./db.js";
const db = openDatabase();
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log("Database initialized:", tables.map((row) => row.name).join(", "));
db.close();

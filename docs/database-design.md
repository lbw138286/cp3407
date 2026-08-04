# Database Design and Implementation

The final application uses an executable relational SQLite database, not browser localStorage. SQLite is a full SQL database engine and is embedded in the Node.js server. The schema is initialized automatically from `server/db.js`; a readable SQL version is in `database/schema.sql`.

Tables: `users`, `sessions`, `categories`, `expenses`, `monthly_budgets`, `acceptance_feedback`, and `bugs`.

Security choices:
- Passwords are salted and hashed using Node.js `scrypt`.
- Session tokens are random; only a SHA-256 token hash is stored.
- Authorization is enforced by the server for every private API route.
- Foreign keys and cascading deletes preserve referential integrity.
- Money is stored as integer cents.

Run `npm start` and open `http://127.0.0.1:3000`. The database file is created at `data/expense-tracker.sqlite`.

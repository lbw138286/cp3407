# Database Design

The project includes a MySQL-style relational database schema in `database/schema.sql`. The design contains the core persistent entities required by the Smart Expense Tracker Web Application:

- `users`: account registration, login identity, and admin/user role.
- `categories`: controlled category names used for filtering and reporting.
- `expenses`: user-owned expense records with title, amount, category, and date.
- `monthly_budgets`: one monthly budget per user per month.
- `budget_alerts`: recorded budget alert results for safe, warning, and over-budget cases.
- `system_test_results`: evidence table for system testing outcomes.

For the final browser demo, local browser storage is used so the lecturer can run the project directly by opening `src/index.html`. For a production deployment, the schema can be implemented in MySQL and connected through a backend API.

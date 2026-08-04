# Design of Major Components

## Architectural design
The system is designed as a browser-based web application with a modular JavaScript structure.

- `index.html`: user interface and page structure.
- `style.css`: graphical interface styling.
- `app.js`: UI event handling and integration between the interface and business logic.
- `expenseManager.js`: core business logic for expenses, budgets, alerts, monthly reports, and spending trends.
- `authService.js`: login validation and authentication logic, including mock-object testing support.
- `database/schema.sql`: relational database schema design for production persistence.

## Class design
The class diagram models the core components: User, ExpenseTracker, Expense, Budget, ReportGenerator, and StorageService. It shows how a user owns an expense tracker, how an expense tracker contains multiple expenses, and how budget/report/storage services support the main application logic.

## Sequence design
The sequence diagram explains the Add Expense workflow. The user enters expense data, the UI submits the data, the controller validates it, the expense tracker creates a record, storage saves it, and the expense table refreshes.

## Interface design
The final UI provides:
- Register and login areas.
- Add/edit expense form.
- Monthly budget form.
- Expense table with edit/delete actions.
- Category filtering.
- Monthly report and spending trend output.
- Admin account management display.

## Database design
A MySQL-style schema is included under `database/schema.sql`. It supports users, categories, expenses, monthly budgets, budget alerts, and system testing results.

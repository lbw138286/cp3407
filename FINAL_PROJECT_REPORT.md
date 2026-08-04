# CP3407 Final Project Report - Smart Expense Tracker

## Executive summary
The final solution is a database-backed Smart Expense Tracker Web Application developed across three Agile iterations. It provides secure account registration/login, expense CRUD, categorisation, monthly budgets, budget alerts, monthly reports, spending trends, administrator account management, acceptance feedback capture, automated tests and bug tracking.

## Requirements and delivery
The committed scope consists of US1-US10. All are implemented and tested. Team capacity was three members multiplied by four working days, giving 12 person-days per iteration. The implementation order respected dependencies: expense records first, categorisation/budgets second, and alerts/reports/trends/account administration third.

## Architecture and design
The system uses a browser UI, Node.js HTTP API, service/business logic, and an embedded relational SQLite database. Editable class, sequence and ER sources are stored in `design/` with online Mermaid Live Editor links in `docs/online-design-tool-evidence.md`. The UI wireframe and implemented responsive interface are also included.

## Database
Runtime data is stored in SQLite tables for users, sessions, categories, expenses, monthly budgets, acceptance feedback and bugs. Foreign keys enforce relationships. Money is stored in cents. The database is automatically initialized and seeded when the server starts.

## Security
Passwords use a random salt and Node.js scrypt hash. Plain passwords are never persisted. Session tokens are random and only their SHA-256 hashes are stored. Server-side authorization protects user and administrator functions. Security headers are applied to responses. HTTPS and environment-based administrator credentials are required for production deployment.

## User stories
US1 registration; US2 secure login; US3 add expense; US4 edit/delete; US5 categorise/filter; US6 monthly budget; US7 alerts; US8 monthly report; US9 spending trends; US10 administrator account management. Final statuses and evidence are in `docs/completed-vs-unfinished-user-stories.md`.

## Testing and defects
The test command is `npm test`. The package contains the original 27 unit/mock tests, one BUG-003 regression test, and 12 database/API integration tests, for a total of 40 passing tests. The final system test result is 15 pass, 0 conditional and 0 fail. All recorded defects are closed.

## Tools and version control
The project uses HTML, CSS, JavaScript, Node.js 22, Node's built-in test runner, Node's SQLite API, Docker, GitHub Actions, GitHub issue forms and pull-request templates. A local Git repository with meaningful final integration commits is included; it must be pushed to the team's real GitHub repository for live evidence.

## Deployment
`npm start` provides a production-style local demo at port 3000. Docker deployment is supported. A public cloud URL requires a repository/cloud account and cannot be created from the submitted ZIP alone. GitHub Pages should host documentation, while the application must use a Node.js-capable host.

## Acceptance and feedback
Internal technical acceptance is complete. The application includes an administrator feedback form that writes real lecturer/client feedback to the relational database. External feedback must be recorded during the real demo and must not be fabricated.

## Conclusion
The package resolves the earlier database, authentication, administration, trend-sorting, documentation-consistency, test and tooling deficiencies. Remaining actions are external account operations: push to GitHub, create live project/issue/PR evidence, invite the lecturer, deploy publicly and record genuine reviewer feedback.

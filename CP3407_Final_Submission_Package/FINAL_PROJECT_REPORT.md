# CP3407 Final Project Report

## 1. Project overview
The project is a Smart Expense Tracker Web Application. The system is designed for users who need to record daily expenses, manage budgets, understand spending habits, and receive warning information when spending approaches or exceeds a monthly budget.

The project is a software/IT development project with source code, a modern graphical web interface, automated tests, GitHub tracking documentation, and a database schema design.

## 2. User groups and problem summary
Three main user groups were considered:

1. University students with limited monthly allowance.
2. Working adults managing salary, savings, bills, and monthly expenses.
3. Small business owners managing multiple expense records.

The main problem is that users often forget or fail to organize expenses correctly. This causes overspending, weak budget control, and poor visibility of spending trends.

## 3. Requirements and user stories
The final backlog contains ten user stories:

| User Story | Feature | Final status |
|---|---|---|
| US1 | Register accounts | Done in final demo |
| US2 | Secure login | Done with mock login tests |
| US3 | Add expenses | Done |
| US4 | Edit and delete expenses | Done |
| US5 | Categorize expenses | Done |
| US6 | Set monthly budgets | Done |
| US7 | Receive budget alerts | Done |
| US8 | Generate monthly financial reports | Done |
| US9 | Analyze spending trends | Done |
| US10 | Admin account management / secure login validation | Done in final demo |

The features were planned and delivered across three iterations using team capacity and velocity.

## 4. Agile planning and velocity
The team has three members, and each member has one working day per week. Each iteration uses four working days. Therefore, the capacity per iteration is:

`3 members × 4 working days = 12 person-days`

This was used for iteration planning and backlog adjustment.

Iteration delivery summary:

| Iteration | Planned / actual capacity | Main user stories |
|---|---:|---|
| Iteration 1 | 12 person-days | US3 Add Expenses, US4 Edit/Delete Expenses |
| Iteration 2 | 12 person-days | US5 Categorize Expenses, US6 Set Monthly Budgets |
| Iteration 3 | 12 person-days | US7 Budget Alerts, US8 Monthly Reports, US9 Trends, US10 Login Testing |

## 5. Design
The design includes architectural, user interface, class, sequence, and database design.

Major components:

- `User`: account identity, login, logout, and role.
- `Expense`: expense title, amount, category, and date.
- `ExpenseTracker`: manages expense records and totals.
- `Budget`: stores monthly budget limits and supports alert checking.
- `ReportGenerator`: produces monthly reports and spending trend analysis.
- `StorageService`: stores and loads data.
- `AuthService`: validates login and supports mock authentication tests.

The class diagram and Add Expense sequence diagram are stored in `diagrams/`. The database design is stored in `database/schema.sql`.

## 6. Implementation
The final implementation is a browser-based web application. The user can:

- Register a user account.
- Log in using a registered account or admin account.
- Add an expense with title, amount, category, and date.
- Edit an existing expense.
- Delete an expense.
- Filter expenses by category.
- Set a monthly budget.
- View budget alert status.
- Generate monthly report data.
- Analyze spending trend.
- View account list as admin.

The final demo can be opened from `src/index.html`.

## 7. Database design
The project includes a MySQL-style relational database schema. The schema includes tables for users, categories, expenses, monthly budgets, budget alerts, and system test results.

For the final browser demo, local browser storage is used so the application can run directly without a server. For production, the relational schema can be connected through a backend API.

## 8. Testing and TDD
The project includes automated tests and system testing documentation.

Automated test files:

- `tests/iteration2.test.js`: 15 tests covering US3, US4, US5, US6, and US7.
- `tests/iteration3.test.js`: 12 tests covering US7, US8, US9, and US10.

The tests cover:

- Expense creation and validation.
- Expense editing and deletion.
- Category filtering and category totals.
- Monthly budget creation and validation.
- Budget alert status.
- Monthly report generation.
- Spending trend analysis.
- Mock login success, failure, and missing input validation.

Run all tests with:

```bash
npm test
```

## 9. Bug/error tracking
Practical 9 focused on bug/error tracking and reporting. The final package includes:

- Bug reporting process.
- Bug log.
- GitHub issue template.
- GitHub Projects bug tracking workflow.
- System testing plan for Week 10 demo.
- System testing results.

The intended workflow is:

1. Create a GitHub Issue for each bug.
2. Add labels such as `bug`, `US7`, `priority-high`, and `in-progress`.
3. Assign the issue to a team member.
4. Move it across Todo, In Progress, and Done.
5. Fix through a branch or pull request.
6. Retest and close the issue.

## 10. Version control and development tools
The project uses GitHub for version control and project tracking. The expected workflow includes GitHub Issues, Projects, Pull Requests, meaningful commits, bug labels, and GitHub Pages documentation.

Development tools used:

- HTML, CSS, JavaScript.
- Node.js built-in test runner.
- GitHub Issues and GitHub Projects.
- GitHub Pages documentation.
- UML diagrams.
- MySQL-style database schema.

## 11. Practical 10 final demo plan
During the Practical 10 demo, the presenter should:

1. Show the repository and final package structure.
2. Open the web application.
3. Demonstrate register and login.
4. Add, edit, and delete expenses.
5. Filter by category.
6. Set a monthly budget.
7. Show budget alert status.
8. Generate a monthly report.
9. Analyze spending trend.
10. Show admin account list.
11. Run `npm test`.
12. Show test results.
13. Open bug log and system testing plan.
14. Open rubric compliance review.
15. Show GitHub Project Board and instructor access.

## 12. Limitations and final manual actions
The following manual actions must be completed in the real GitHub repository before final submission:

- Push all files to the GitHub repository.
- Confirm GitHub Pages is published and accessible.
- Confirm GitHub Project Board shows Todo / In Progress / Done.
- Invite the lecturer as a collaborator.
- Run `npm test` one final time.

## 13. Conclusion
The final project package addresses the Practical 10 requirement by preparing the project demo and reviewing the marking rubric. It also consolidates the full project evidence: requirements, design, implementation, testing, bug tracking, version control process, agile planning, and final report materials.

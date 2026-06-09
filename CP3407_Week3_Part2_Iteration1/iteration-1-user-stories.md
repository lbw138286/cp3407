# Iteration 1 User Stories

Iteration 1 was selected from high-priority user stories in the Milestone 1 backlog. The goal of this iteration is to create a usable foundation for the Smart Expense Tracker Web Application.

## Iteration 1 Scope

| ID | Title | Description | Priority | Estimated Effort | Status |
|---|---|---|---:|---:|---|
| US1 | User Registration | As a user, I want to create an account so that I can securely store my financial data. | 10 | 3 days | Todo |
| US2 | User Login | As a user, I want to log into the system so that I can access my expense records securely. | 10 | 2 days | Todo |
| US3 | Add Expenses | As a user, I want to add daily expenses so that I can track my spending habits. | 10 | 4 days | Done |
| US4 | Edit and Delete Expenses | As a user, I want to edit and delete expenses so that I can correct mistakes in my records. | 10 | 3 days | Done |

## Completed User Stories

### US3 - Add Expenses

US3 allows users to record expense information through a web form. The implemented fields include expense title, amount, category, and date. After submission, the expense is shown in a table and saved in browser localStorage. Basic validation is included to prevent invalid records.

### US4 - Edit and Delete Expenses

US4 allows users to maintain existing expense records. Users can click the Edit button to load an existing record back into the form, modify the information, and save the updated record. Users can also delete an expense after confirming the action. The updated list is saved to localStorage, so changes remain after the page is refreshed.

## Implementation Rationale

US3 and US4 were selected because they provide the minimum usable expense-recording workflow. Users must be able to create records first, but they also need to correct or remove incorrect records. These two user stories provide a practical base for later features such as categorisation, budget alerts, monthly reports, and spending trend analysis.

# Practical 7: Automated Tests Report

## Automated test summary

| Area | User Story | Number of Automated Tests |
|---|---|---:|
| Expense creation | US3 Add Expenses | 3 |
| Expense management | US4 Edit and Delete Expenses | 3 |
| Categorisation | US5 Categorize Expenses | 3 |
| Budget setting | US6 Set Monthly Budgets | 3 |
| Budget alerts | US7 Receive Budget Alerts | 3 |
| **Total** |  | **15** |

## Test command

```bash
npm test
```

## Test file

```text
tests/expenseManager.test.js
```

## Expected result

All 15 automated tests should pass.

## Why these tests were selected

These tests cover the key functional behaviour of the Smart Expense Tracker Web Application. They check successful operations, invalid input, missing records, category filtering, monthly budget calculation, and budget alert logic. This gives basic confidence that the main financial tracking logic is working correctly before more UI and integration testing is added.

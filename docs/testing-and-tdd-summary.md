# Testing and TDD Summary

## TDD approach
The testing work used a test-driven approach: expected behaviours were first written as test specifications, then automated tests were implemented, and the application logic was checked against those tests.

## Automated tests
The final project contains three automated test files:

- `tests/backend.test.js`: 12 database and API integration tests covering US1-US10, including registration, authentication, relational persistence, expense CRUD, budgets, reports, trends and administrator controls.
- `tests/iteration2.test.js`: 15 unit tests covering US3-US7 expense, category, monthly-budget and budget-alert behaviour.
- `tests/iteration3.test.js`: 14 unit, mock and regression tests covering US7-US10, including BUG-003 month sorting and decimal-precision regression coverage.

The final automated test result is 41 passed and 0 failed. GitHub Actions runs the same `npm test` command for pushes and pull requests.

## Test command
Run all tests with:

```bash
npm test
```

## System testing
The system testing plan for the Week 10 demo is stored in:

`docs/system-testing-plan-week10-demo.md`

It checks the whole application workflow, including registration, login, expense CRUD, category filtering, budget setting, alert checking, monthly reports, spending trends, administrator account management and SQLite persistence.

## Bug/error tracking
Bug/error tracking evidence is stored in:

- `docs/bug-reporting-and-tracking-process.md`
- `docs/bug-log.md`
- `docs/system-test-results.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`

The completed workflow used GitHub Issues, GitHub Projects, feature and bug-fix branches, Pull Requests, teammate review, GitHub Actions and releases.

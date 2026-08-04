# Testing and TDD Summary

## TDD approach
The testing work used a test-driven approach: expected behaviours were first written as test specifications, then automated tests were implemented, and the application logic was checked against those tests.

## Automated tests
The final package contains two automated test files:

- `tests/iteration2.test.js`: 15 automated tests covering US3, US4, US5, US6, and US7.
- `tests/iteration3.test.js`: 12 automated tests covering US7, US8, US9, and US10.

## Test command
Run all tests with:

```bash
npm test
```

## System testing
The system testing plan for the Week 10 demo is stored in:

`docs/system-testing-plan-week10-demo.md`

It checks the whole application workflow, including login, expense CRUD, category filtering, budget setting, alert checking, monthly reports, spending trends, and local persistence behaviour.

## Bug/error tracking
Bug/error tracking evidence is stored in:

- `docs/bug-reporting-and-tracking-process.md`
- `docs/bug-log.md`
- `docs/system-test-results.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`

The intended workflow is GitHub Issues + GitHub Projects + Pull Requests.

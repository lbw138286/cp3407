# Week 10 System Testing Plan

## Environment
- Node.js 22 server at `http://127.0.0.1:3000`
- Runtime relational SQLite database at `data/expense-tracker.sqlite`
- Fresh demo user plus administrator account

## Tests
Use the 15 tests recorded in `docs/system-test-results.md`. Demonstrate registration/login, expense CRUD, category filter, budgets, alert boundaries, monthly reports, chronological trends, administrator user management and relational persistence.

## Exit criteria
- 15/15 system tests pass.
- `npm test` reports 40/40 pass.
- No critical or high-priority bugs remain open.
- Genuine reviewer feedback is recorded after the demo.

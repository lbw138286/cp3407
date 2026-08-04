# Acceptance Testing and Client Feedback

## Technical acceptance completed
The final test suite and system test plan verify all committed US1-US10 features. All automated and system tests pass.

## Demonstration acceptance procedure
During the lecturer/client demonstration:
1. Demonstrate each US using the Week 10 script.
2. Record the reviewer name, outcome and comments in the application's Acceptance Feedback form.
3. The record is saved to the `acceptance_feedback` database table.
4. Export or screenshot the saved record and attach it to the GitHub issue/page.

External feedback cannot be invented before a real reviewer supplies it. The application now includes the mechanism needed to capture that evidence during the demo.

| Iteration | Planned reviewer | Outcome | Comments / changes |
|---|---|---|---|
| 1 | Lecturer/client | To be recorded during review | |
| 2 | Lecturer/client | To be recorded during review | |
| 3 | Lecturer/client | To be recorded during final demo | |

## SQLite Persistence Verification

Date: 4 August 2026

The Node.js server was stopped and restarted without deleting the SQLite
database file. After logging in again with the same account, the previously
created users, expenses, categories, monthly budget and report data were still
available.

Result: Passed
Evidence: SQLite-01-data-before-restart.png,
SQLite-02-server-restarted.png and SQLite-03-data-after-restart.png

## Iteration 3 Final Acceptance Feedback

- Date: 4 August 2026
- Reviewer: Dasheng LIU
- Features demonstrated: US1-US10
- Automated test result: 41 passed, 0 failed
- Outcome: [Accepted / Accepted with minor changes / Changes required]
- Reviewer comments: [Exact feedback received]
- Actions taken: [Changes completed after the feedback, if any]
- Evidence: Acceptance-Iteration3-Lecturer-Feedback.png
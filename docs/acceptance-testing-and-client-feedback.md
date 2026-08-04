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
| 3 | Dasheng LIU | Changes required | Data presentation was too complex and should be made more user-friendly. |

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
- Outcome: Changes required
- Reviewer comments: The lecturer stated that the current data presentation was too complex and was not convenient for users to read and understand. The monthly report and spending trend results were mainly displayed as raw JSON data. Although the calculations were correct, the presentation was more suitable for developers than normal users.
- Actions taken: The lecturer feedback was recorded and the data-presentation usability issue was documented.
- Planned improvement: Replace or supplement the raw JSON output with clearer summary cards, formatted tables and spending-trend charts. Currency values and trend directions should be displayed using simple and readable labels.
- Evidence: `docs/evidence/Acceptance-Iteration3-Lecturer-Feedback.png`

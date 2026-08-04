# Acceptance Testing and Client Feedback

## Technical Acceptance Completed

The final automated and system test activities verify all committed US1-US10
features. The current automated test result is 41 passed and 0 failed.

## Demonstration Acceptance Procedure

During the lecturer/client demonstration:

1. Demonstrate each user story using the Week 10 demonstration process.
2. Record the reviewer name, outcome and genuine comments.
3. Save the feedback through the application's Acceptance Feedback form.
4. Retain screenshots and GitHub evidence for verification.

External feedback must not be invented. Only feedback actually received during
the demonstration is recorded below.

## Iteration Review Summary

| Iteration | Reviewer / review type | Outcome | Comments / changes |
|---|---|---|---|
| 1 | Technical and internal acceptance | Passed | Core expense creation, editing and deletion functions were implemented and tested. No separate external feedback record was captured. |
| 2 | Technical and internal acceptance | Passed | Category, monthly budget and budget-alert functions were implemented and tested. No separate external feedback record was captured. |
| 3 | Dasheng LIU | Changes required; improvement implemented | The data presentation was too complex and was not convenient for normal users to read. |

## SQLite Persistence Verification

- Date: 4 August 2026
- Result: Passed

The Node.js server was stopped and restarted without deleting the SQLite
database. After logging in again with the same account, the previously created
users, expenses, categories, monthly budget and report data remained available.

Evidence is stored in the [`docs/evidence`](evidence/) directory.

## Iteration 3 Final Acceptance Feedback

- Date: 4 August 2026
- Reviewer: Dasheng LIU
- Features demonstrated: US1-US10
- Automated test result at demonstration: 41 passed, 0 failed
- Outcome: Changes required
- Reviewer comments: The lecturer stated that the current data presentation was too complex and was not convenient for users to read and understand. The monthly report and spending trend information used a complex raw-data presentation that was more suitable for developers than normal users.

## Actions Taken

The report and spending trend interface was redesigned in response to the
lecturer's usability feedback.

The completed improvements include:

- Raw JSON is no longer the primary user interface.
- Monthly report totals are presented through clear summary cards.
- Expense information is presented in a formatted table.
- Category spending is displayed using readable progress bars.
- Spending trends use clear direction, change, period and latest-month summaries.
- Monthly spending is displayed through visual comparison bars.
- Insufficient-data situations display clear user guidance.
- Raw JSON remains available only as optional technical evidence.

The improvement was implemented through Pull Request #34 and published in
release v1.0.1.

## Verification After Improvement

- Existing Node.js and SQLite functionality remained operational.
- US1-US10 remained available.
- 41 automated tests passed with 0 failures.
- GitHub Actions checks passed.
- The improved report and spending trend interface was manually verified in a browser.

## Final Status

The usability issue raised during the lecturer demonstration has been addressed
in the submitted implementation. A second formal acceptance decision has not
been recorded, so the original outcome remains documented as Changes required,
with the corrective action completed.

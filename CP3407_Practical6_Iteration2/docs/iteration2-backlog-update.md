# Practical 6: Updated Iteration 2 Backlog

Project: Smart Expense Tracker Web Application  
Basis: Iteration 1 actual velocity = 4 story-days.

## Original Remaining Backlog After Iteration 1

| User Story | Description | Previous Estimate | Dependency | Previous Status |
|---|---|---:|---|---|
| US5 | Categorize Expenses | 2 days | Depends on expenses being added | Todo |
| US6 | Set Monthly Budgets | 2 days | Depends on expense records | Todo |
| US7 | Receive Budget Alerts | 2 days after back-check | Depends on monthly budget | Todo |
| US8 | Generate Monthly Financial Reports | 3 days | Depends on categorized expenses | Future |
| US9 | Analyze Spending Trends | 3 days | Depends on reports and expense history | Future |
| US10 | Secure Account Login | 3 days | Independent but larger scope | Future |

## Updated Iteration 2 Backlog

The Iteration 1 velocity was 4 story-days. Therefore, Iteration 2 is planned around 4 story-days instead of trying to include too many user stories.

| Iteration 2 User Story | Priority | Estimate | Status | Reason for Selection |
|---|---:|---:|---|---|
| US5: Categorize Expenses | High | 2 days | In Progress | Categories improve expense organization and prepare data for future reports. |
| US6: Set Monthly Budgets | High | 2 days | Todo | Budget setting is required before budget alerts can work. |

Total Iteration 2 planned workload: **4 story-days**.

## Deferred User Stories

| Deferred User Story | New Iteration | Reason |
|---|---|---|
| US7: Receive Budget Alerts | Iteration 3 | It depends on US6. Budget alerts should not be implemented before the budget value and monthly spending calculation are stable. |
| US8: Generate Monthly Financial Reports | Iteration 3 | It depends on categorized expenses and stored expense history. |
| US9: Analyze Spending Trends | Later iteration | It requires more historical data and reporting logic. |
| US10: Secure Account Login | Later iteration | It is important but larger in scope and should be planned separately. |

## Backlog Adjustment Summary

The backlog was adjusted to avoid overloading Iteration 2. US5 and US6 were selected because they directly extend the completed Iteration 1 expense management features. US7 was postponed because it depends on US6 and would increase the iteration beyond the measured velocity.

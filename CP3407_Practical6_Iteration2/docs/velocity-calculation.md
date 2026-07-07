# Practical 6: Iteration 1 Actual Velocity Calculation

Project: Smart Expense Tracker Web Application  
Practical: Practical 6  
Focus: Calculate actual velocity from Iteration 1 and use it to update Iteration 2 planning.

## Velocity Method

Velocity is calculated by adding the estimates of user stories that were fully completed during the iteration. Only completed user stories are counted. Partially completed or unfinished user stories are not counted in the velocity.

## Iteration 1 Completed User Stories

| User Story | Description | Estimate | Status | Counted in Velocity? |
|---|---|---:|---|---|
| US3 | Add Expenses | 2 days | Done | Yes |
| US4 | Edit and Delete Expenses | 2 days | Done | Yes |
| US5 | Categorize Expenses | 2 days | Todo | No |
| US6 | Set Monthly Budgets | 2 days | Todo | No |
| US7 | Receive Budget Alerts | 2 days after back-check | Todo | No |

## Calculation

```text
Actual Velocity = Completed US3 estimate + Completed US4 estimate
Actual Velocity = 2 days + 2 days
Actual Velocity = 4 story-days
```

## Result

The actual velocity of Iteration 1 is **4 story-days**.

## Planning Impact for Iteration 2

Because the team completed 4 story-days in Iteration 1, Iteration 2 should not take on too much more than 4 story-days of work. This avoids over-planning and keeps the iteration realistic.

Updated Iteration 2 selection:

| User Story | Estimate | Reason |
|---|---:|---|
| US5: Categorize Expenses | 2 days | Important for organizing expenses and preparing future reports. |
| US6: Set Monthly Budgets | 2 days | Needed before budget alerts can be implemented. |

Total planned workload for Iteration 2: **4 story-days**.

US7: Receive Budget Alerts is moved to Iteration 3 because it depends on US6 being completed first.

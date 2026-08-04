# Practical 6: Iteration 1 Actual Velocity Calculation

Project: Smart Expense Tracker Web Application  
Practical: Practical 6  
Focus: Calculate actual velocity from Iteration 1 and use it to update Iteration 2 planning.

## Velocity Method

Velocity is calculated by adding the estimates of user stories that were fully completed during the iteration. Only completed user stories are counted. Partially completed or unfinished user stories are not counted in the velocity.

For this project, the estimation unit is updated to **person-days / individual work-days** because the project is completed by a team of three members.

## Team Capacity Assumption

| Item | Value |
|---|---:|
| Number of team members | 3 |
| Available working days per member | 4 |
| Total individual work-days | 12 person-days |

```text
Team capacity = Number of team members × Available working days per member
Team capacity = 3 × 4
Team capacity = 12 person-days
```

## Iteration 1 Completed User Stories

| User Story | Description | Updated Estimate | Status | Counted in Velocity? |
|---|---|---:|---|---|
| US3 | Add Expenses | 6 person-days | Done | Yes |
| US4 | Edit and Delete Expenses | 6 person-days | Done | Yes |
| US5 | Categorize Expenses | 6 person-days | Todo | No |
| US6 | Set Monthly Budgets | 6 person-days | Todo | No |
| US7 | Receive Budget Alerts | 6 person-days after back-check | Todo | No |

## Calculation

```text
Actual Velocity = Completed US3 estimate + Completed US4 estimate
Actual Velocity = 6 person-days + 6 person-days
Actual Velocity = 12 person-days
```

## Result

The actual velocity of Iteration 1 is **12 person-days**.

## Planning Impact for Iteration 2

Because the team completed 12 person-days in Iteration 1, Iteration 2 should be planned around the same capacity. This avoids over-planning and keeps the iteration realistic for a three-member team with limited weekly working time.

Updated Iteration 2 selection:

| User Story | Estimate | Reason |
|---|---:|---|
| US5: Categorize Expenses | 6 person-days | Important for organizing expenses and preparing future reports. |
| US6: Set Monthly Budgets | 6 person-days | Needed before budget alerts can be implemented. |

Total planned workload for Iteration 2: **12 person-days**.

US7: Receive Budget Alerts is moved to Iteration 3 because it depends on US6 being completed first.

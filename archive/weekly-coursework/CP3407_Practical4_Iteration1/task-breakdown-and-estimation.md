# Practical 4: Task Breakdown and Estimation

Project: Smart Expense Tracker Web Application  
Iteration: Iteration 1  
Objective: Split user stories into implementation tasks, estimate task effort, and back-check original user story estimates.

## Estimation Method

The estimation uses small practical work units measured in **days of work**. One day means one practical development session or equivalent focused work period. The estimate includes coding, basic testing, documentation, and status update time.

## Iteration 1 User Stories

| User Story | Priority | Original Estimate | Back-Checked Estimate | Status | Reason for Back-Check |
|---|---:|---:|---:|---|---|
| US3: Add Expenses | High | 2 days | 2 days | Done | The feature required form design, validation, table rendering, and local storage. The original estimate was accurate. |
| US4: Edit and Delete Expenses | High | 2 days | 2 days | Done | Editing and deleting required event handling, updating stored records, and refreshing the UI. The original estimate was accurate. |
| US5: Categorize Expenses | Medium | 2 days | 2 days | Todo | Category support exists in the form, but advanced category management is not yet implemented. |
| US6: Set Monthly Budgets | Medium | 2 days | 3 days | Todo | Budget logic needs budget input, saved budget data, and comparison with total expenses. Estimate increased by 1 day. |
| US7: Receive Budget Alerts | Medium | 1 day | 2 days | Todo | Alerts depend on monthly budget tracking and need rule-based feedback. Estimate increased by 1 day. |

## US3: Add Expenses — Task Breakdown

| Task ID | Task Description | Estimate | Label | Status |
|---|---|---:|---|---|
| T3.1 | Create expense input form with title, amount, category, and date fields | 0.5 day | frontend | Done |
| T3.2 | Add JavaScript function to capture form input | 0.5 day | development | Done |
| T3.3 | Validate required fields and amount value | 0.25 day | testing | Done |
| T3.4 | Display submitted expenses in the expense table | 0.5 day | frontend | Done |
| T3.5 | Save expense records to local storage | 0.25 day | data-storage | Done |

Total Back-Checked Estimate: **2 days**

## US4: Edit and Delete Expenses — Task Breakdown

| Task ID | Task Description | Estimate | Label | Status |
|---|---|---:|---|---|
| T4.1 | Add Edit and Delete buttons to each expense row | 0.5 day | frontend | Done |
| T4.2 | Implement delete function to remove selected expense records | 0.5 day | development | Done |
| T4.3 | Implement edit function to load selected record back into the form | 0.5 day | development | Done |
| T4.4 | Update local storage after edit or delete actions | 0.25 day | data-storage | Done |
| T4.5 | Test add, edit, delete, and refresh behaviour | 0.25 day | testing | Done |

Total Back-Checked Estimate: **2 days**

## Remaining Iteration 1 Support Tasks

| Task ID | Task Description | Estimate | Label | Status |
|---|---|---:|---|---|
| T1.1 | Update project board with Todo, In Progress, and Done labels | 0.25 day | project-management | Done |
| T1.2 | Update burndown data and graph | 0.5 day | tracking | Done |
| T1.3 | Create class diagram for system structure | 0.5 day | design | Done |
| T1.4 | Create sequence diagram for Add Expense operation | 0.5 day | design | Done |
| T1.5 | Document GitHub issue assignment and pull request workflow | 0.25 day | github | Done |

## Summary

The original estimates for US3 and US4 were accurate because both user stories were completed within the expected workload. US6 and US7 were adjusted because budget alerts depend on budget calculation logic, which makes them more complex than initially estimated.

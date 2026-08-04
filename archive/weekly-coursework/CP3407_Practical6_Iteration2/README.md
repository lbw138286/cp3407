# CP3407 Practical 6: Iteration 2

Project: Smart Expense Tracker Web Application  
Objective: Reflect on Iteration 1 and adjust plans for Iteration 2.

## Completed Practical 6 Requirements

| Requirement | Completed Evidence |
|---|---|
| Calculate the actual velocity of Iteration 1 | `docs/velocity-calculation.md` |
| Check classes for SRP and DRY | `docs/srp-dry-review.md` |
| Draw burn down rate graph for Iteration 1 | `burndown-rate-graph-iteration1.png` and `docs/burndown-rate-data.md` |
| Use Iteration 1 velocity to update Iteration 2 backlog | `docs/iteration2-backlog-update.md` |
| Monitor Iteration 2 tasks and user stories with todo, in-progress, done labels | `docs/iteration2-task-board.md` |
| Document completed vs unfinished user stories | `docs/completed-vs-unfinished-user-stories.md` |
| Update GitHub pages for each completed user story | `github-pages/us3-add-expenses.md` and `github-pages/us4-edit-delete-expenses.md` |

## Team Capacity Assumption

The project team has **3 members**. Each member has **1 available working day per week**, and Iteration 1 covers **4 working weeks / 4 working days**.

```text
Team capacity = 3 members × 4 working days
Team capacity = 12 individual work-days / person-days
```

Therefore, the Iteration 1 velocity and Iteration 2 planning are expressed as **12 person-days** instead of 4 story-days.

## Iteration 1 Result

Iteration 1 completed two user stories:

- US3: Add Expenses — Done — 6 person-days
- US4: Edit and Delete Expenses — Done — 6 person-days

Actual velocity for Iteration 1: **12 person-days**.

## Iteration 2 Updated Plan

Based on the Iteration 1 velocity and team capacity, the Iteration 2 backlog is limited to approximately **12 person-days**:

- US5: Categorize Expenses — 6 person-days
- US6: Set Monthly Budgets — 6 person-days scoped version for Iteration 2

US7: Receive Budget Alerts is moved to Iteration 3 because it depends on the monthly budget feature being completed first.

## Files Included

```text
CP3407_Practical6_Iteration2/
├── README.md
├── burndown-rate-graph-iteration1.png
├── docs/
│   ├── velocity-calculation.md
│   ├── srp-dry-review.md
│   ├── burndown-rate-data.md
│   ├── iteration2-backlog-update.md
│   ├── iteration2-task-board.md
│   ├── completed-vs-unfinished-user-stories.md
│   ├── github-tracking-plan.md
│   └── issues-to-create.md
├── github-pages/
│   ├── us3-add-expenses.md
│   └── us4-edit-delete-expenses.md
├── diagrams/
│   ├── class-diagram.png
│   └── sequence-diagram-add-expense.png
└── src/
    ├── index.html
    ├── style.css
    └── script.js
```

## Practical 6 Summary

For Practical 6, the previous iteration was reviewed and the actual velocity was recalculated based on the team capacity. Since the team has three members and each member has one working day per week across four working weeks, the total available work capacity is 12 person-days. The class design and current JavaScript code were checked against SRP and DRY. The Iteration 1 burn down rate graph was updated to show remaining work across 12 person-days. The Iteration 2 backlog was adjusted using the measured velocity, and the new Iteration 2 user stories and tasks were placed into Todo, In Progress, and Done status labels for GitHub tracking. GitHub page content was also prepared for each completed user story.

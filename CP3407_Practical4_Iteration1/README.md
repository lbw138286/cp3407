# CP3407 Practical 4: Iteration 1 - Execution & Tracking

Project: Smart Expense Tracker Web Application  
Practical: Practical 4  
Objective: Development execution and progress tracking using Chapter 4 project management practices.

## Completed Practical 4 Requirements

| Requirement | Completed Evidence |
|---|---|
| Split user stories into tasks and provide task estimation | `task-breakdown-and-estimation.md` |
| Back-check user story estimation | `task-breakdown-and-estimation.md` |
| Monitor tasks with labels: todo, in-progress, done | `task-board-practical4.md` |
| Develop class diagram | `diagrams/class-diagram.md` and `diagrams/class-diagram.png` |
| Develop at least one sequence diagram | `diagrams/sequence-diagram-add-expense.md` and `diagrams/sequence-diagram-add-expense.png` |
| Explore GitHub issue assignment and statuses | `github-tracking-evidence.md` |
| Commit code daily with meaningful messages | `commit-log.md` |
| Experiment with pull requests for code review | `github-tracking-evidence.md` |

## Implemented Iteration 1 Features

### US3: Add Expenses

Users can add a new expense by entering the expense title, amount, category, and date. The record is displayed in the expense table and saved with local storage.

### US4: Edit and Delete Expenses

Users can edit existing expense records or delete records that are no longer needed. The updated data is immediately reflected in the table and saved in local storage.

## Project Structure

```text
CP3407_Practical4_Iteration1/
├── README.md
├── task-breakdown-and-estimation.md
├── task-board-practical4.md
├── github-tracking-evidence.md
├── commit-log.md
├── milestone-1-iteration-plan.md
├── iteration-1-user-stories.md
├── project-board.md
├── burndown-data.md
├── burndown-graph.png
├── diagrams/
│   ├── class-diagram.md
│   ├── class-diagram.png
│   ├── sequence-diagram-add-expense.md
│   └── sequence-diagram-add-expense.png
└── src/
    ├── index.html
    ├── style.css
    └── script.js
```

## How to Run

Open the following file in a browser:

```text
src/index.html
```

The page supports adding, editing, and deleting expense records. Data is saved in browser local storage.

## Practical 4 Summary

For Practical 4, Iteration 1 user stories were decomposed into smaller technical and management tasks. Each task was estimated, labelled, and assigned a status. The estimates for US3 and US4 were reviewed and confirmed as accurate, while later budget-related user stories were adjusted because they require additional logic. A class diagram was developed to describe the main system structure, and a sequence diagram was created to show the Add Expense workflow. GitHub task tracking was documented using issue assignment, labels, status updates, daily commits, and pull request review notes.

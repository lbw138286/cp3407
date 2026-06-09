# CP3407 Practical Week 3 Part 2 - Iteration 1

## Project
Smart Expense Tracker Web Application

## Objective
Review planned user stories for Milestone 1 and implement at least two user stories from Iteration 1.

## Completed Practical Tasks

### 1. Allocate user stories into three iterations
The file `milestone-1-iteration-plan.md` allocates user stories into Iteration 1, Iteration 2, and Iteration 3 according to priority and estimated work days.

### 2. Monitor Iteration 1 user stories on a project board
The file `project-board.md` works as a simple project board with three labels:

- Todo
- In Progress
- Done

### 3. Implement at least two Iteration 1 user stories
Two Iteration 1 user stories were implemented:

| ID | User Story | Status |
|---|---|---|
| US3 | Add Expenses | Done |
| US4 | Edit and Delete Expenses | Done |

### 4. Draw a Burn Down Graph
The file `burndown-graph.png` shows the planned and actual remaining work for Iteration 1.

## Implemented Features

### US3 - Add Expenses
Users can add an expense by entering:

- Expense title
- Amount
- Category
- Date

The new record is displayed in the expense table and saved using browser localStorage.

### US4 - Edit and Delete Expenses
Users can edit an existing expense record, update the details, cancel editing, or delete a record. All changes are saved in localStorage.

## How to Run

1. Open `src/index.html` in a web browser.
2. Add an expense record using the form.
3. Confirm that the record appears in the table.
4. Click Edit to update the record.
5. Click Delete to remove the record.

## File Structure

```text
CP3407_Week3_Part2_Iteration1/
├── README.md
├── milestone-1-iteration-plan.md
├── iteration-1-user-stories.md
├── project-board.md
├── burndown-data.md
├── burndown-graph.png
└── src/
    ├── index.html
    ├── style.css
    └── script.js
```

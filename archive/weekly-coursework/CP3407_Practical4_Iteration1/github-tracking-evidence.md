# GitHub Tracking Evidence

This document records how GitHub features were explored for task tracking during Practical 4.

## Issues Created

| Issue | Title | Assignee | Label | Status |
|---|---|---|---|---|
| #1 | Implement US3: Add Expenses | Noah Jiang | feature, done | Closed |
| #2 | Implement US4: Edit and Delete Expenses | Noah Jiang | feature, done | Closed |
| #3 | Create class diagram | Noah Jiang | design, done | Closed |
| #4 | Create sequence diagram for Add Expense | Noah Jiang | design, done | Closed |
| #5 | Prepare pull request review evidence | Noah Jiang | github, done | Closed |
| #6 | Back-check user story estimates | Noah Jiang | planning, in-progress | Open |
| #7 | Prepare US5 category management for next iteration | Team Member 2 | enhancement, todo | Open |

## Example Issue Description

### Issue #1: Implement US3 Add Expenses

**Description:**  
Create a working expense entry feature that allows users to input expense title, amount, category, and date. The expense should be displayed in the table and saved in local storage.

**Acceptance Criteria:**
- User can enter expense details.
- User can submit the expense form.
- New expense appears in the table.
- Expense data remains after browser refresh.

**Status:** Done

## Pull Request Experiment

| Pull Request | Source Branch | Target Branch | Purpose | Review Result |
|---|---|---|---|---|
| PR #1 | feature/add-expense | main | Add US3 expense form, table display, and local storage | Approved and merged |
| PR #2 | feature/edit-delete-expense | main | Add edit and delete operations for expenses | Approved and merged |
| PR #3 | docs/practical4-diagrams | main | Add class diagram, sequence diagram, and task tracking documents | Approved and merged |

## Code Review Notes

### PR #1 Review

- Checked that the expense form includes title, amount, category, and date.
- Confirmed that data is saved in local storage.
- Suggested adding validation for empty fields and invalid amount values.

### PR #2 Review

- Checked that each expense row has Edit and Delete actions.
- Confirmed that edited records update the table and local storage correctly.
- Confirmed that deleted records are removed from both the UI and local storage.

### PR #3 Review

- Checked that diagrams match the current implementation.
- Confirmed that task breakdown and estimates are clearly documented.
- Confirmed that project board labels match Practical 4 requirements.

## GitHub Workflow Summary

The GitHub workflow used for this practical follows a simple development process:

1. Create issues for each user story and technical task.
2. Assign issues to team members.
3. Add labels such as todo, in-progress, done, feature, design, and testing.
4. Create a branch for each feature or documentation update.
5. Commit code with meaningful messages.
6. Open a pull request for review.
7. Review the changes before merging into main.
8. Move the issue status to Done after completion.

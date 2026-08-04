# Practical 9 - Bug/Error Reporting and Tracking Process

## Purpose

The purpose of this document is to define how bugs and errors from system testing are reported, tracked, fixed, reviewed, and closed for the Smart Expense Tracker Web Application.

The previous workflow mainly used user-story documents and GitHub Pages to record progress. For Practical 9, the workflow is improved by adding a formal bug tracking process using GitHub Issues, GitHub Project Board labels, and Pull Requests.

## Updated Bug Reporting Process

### Step 1: Find the bug during system testing

A bug may be found when testing a complete user flow, such as adding an expense, setting a budget, generating a report, or testing login behaviour.

### Step 2: Create a GitHub Issue

Each bug should be recorded as a separate GitHub Issue. The issue should include:

- Bug ID
- Linked user story
- Summary
- Environment
- Preconditions
- Steps to reproduce
- Expected result
- Actual result
- Severity
- Priority
- Assignee
- Status
- Screenshot or test evidence, if available

### Step 3: Add labels and status

Each bug issue should be labelled clearly. The minimum labels should include:

- `bug`
- `system-testing`
- one status label: `todo`, `in-progress`, or `done`
- one priority label: `high-priority`, `medium-priority`, or `low-priority`

### Step 4: Link the bug to the relevant user story

The bug should be linked to the related user story page and project board item. This makes it clear which feature is affected.

### Step 5: Fix the bug in a branch

A new branch should be created for each bug fix, for example:

```bash
fix/us7-budget-alert-threshold
```

### Step 6: Create a pull request for review

After fixing the bug, create a Pull Request. The PR should reference the issue ID, describe the fix, and include testing evidence.

### Step 7: Retest and close

After review, the bug should be retested. If the bug is fixed, move it to Done and close the issue. If it is not fixed, move it back to In Progress.

## Bug Status Definition

| Status | Meaning |
|---|---|
| Todo | Bug has been reported but not yet fixed |
| In Progress | Bug is being investigated or fixed |
| Ready for Review | Fix has been submitted through a pull request |
| Done | Bug has been fixed, retested, and closed |

## Severity Definition

| Severity | Meaning |
|---|---|
| Critical | Prevents the main system from working |
| High | Breaks an important feature or produces wrong financial results |
| Medium | Affects usability or partial functionality |
| Low | Minor display, wording, or layout issue |

## Priority Definition

| Priority | Meaning |
|---|---|
| High | Must be fixed before Week 10 demo |
| Medium | Should be fixed if time allows |
| Low | Can be fixed after main demo functions are stable |

## Why this process is better

This process is better than only writing bug notes in user-story pages because GitHub Issues provide better traceability, assignment, labels, discussions, status tracking, and links to Pull Requests. It also allows the teacher and team members to see what has been found, what has been fixed, and what still needs attention.

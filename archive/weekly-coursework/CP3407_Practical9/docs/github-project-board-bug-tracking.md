# Practical 9 - GitHub Project Board Bug Tracking Setup

## Recommended board columns

| Column | Meaning |
|---|---|
| Todo | New bugs and errors waiting for investigation |
| In Progress | Bugs currently being investigated or fixed |
| Ready for Review | Bug fix submitted through a pull request |
| Done | Bug fixed, reviewed, retested, and closed |

## Recommended labels

| Label | Purpose |
|---|---|
| bug | Identifies a bug/error report |
| system-testing | Bug found during system testing |
| regression-test | Needs retesting after fix |
| high-priority | Must be fixed before demo |
| medium-priority | Should be fixed if time allows |
| low-priority | Minor issue |
| todo | Not started |
| in-progress | Being fixed |
| done | Completed |
| ready-for-review | Waiting for review |

## Project board items to create

| Issue title | Label | Initial status |
|---|---|---|
| BUG-001: Budget alert threshold states are unclear | bug, system-testing, high-priority | Done |
| BUG-002: Monthly report includes wrong month data risk | bug, system-testing, high-priority | Done |
| BUG-003: Spending trend should sort months chronologically | bug, system-testing, medium-priority | In Progress |
| BUG-004: Login should reject missing email or password | bug, system-testing, high-priority | Done |
| BUG-005: Category filter should handle inconsistent category names | bug, system-testing, medium-priority | Todo |

## Pull request workflow

For each bug fix:

1. Create a branch.
2. Fix the bug.
3. Run tests.
4. Create a Pull Request.
5. Link the Pull Request to the bug issue.
6. Review the code.
7. Merge after approval.
8. Move the issue to Done.

## Example branch names

```text
fix/bug-001-budget-alert
fix/bug-002-monthly-report-filter
fix/bug-003-trend-sorting
fix/bug-004-login-validation
fix/bug-005-category-normalisation
```

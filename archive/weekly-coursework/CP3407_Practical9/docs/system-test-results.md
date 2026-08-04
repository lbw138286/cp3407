# Practical 9 - System Test Results

| Test ID | Linked US | Test Summary | Result | Notes |
|---|---|---|---|---|
| ST-001 | US3 | Add an expense | Pass | Expense appears in table |
| ST-002 | US4 | Edit an expense | Pass | Updated value is shown |
| ST-003 | US4 | Delete an expense | Pass | Record is removed |
| ST-004 | US5 | Filter expenses by category | Pass | Food filter works with standard category values |
| ST-005 | US6 | Set monthly budget | Pass | Budget value saved |
| ST-006 | US7 | Budget alert safe status | Pass | Safe status confirmed |
| ST-007 | US7 | Budget alert warning status | Pass | Warning threshold confirmed |
| ST-008 | US7 | Budget alert over-budget status | Pass | Over-budget alert confirmed |
| ST-009 | US8 | Generate monthly financial report | Pass | Report total calculated |
| ST-010 | US8 | Exclude wrong month from report | Pass | Month filter confirmed |
| ST-011 | US9 | Analyze spending trends | Conditional Pass | Basic trend works; chronological sorting to be retested |
| ST-012 | US10 | Mock login success | Pass | Mock login accepted valid credentials |
| ST-013 | US10 | Mock login failure | Pass | Invalid credentials rejected |
| ST-014 | US10 | Missing login input | Pass | Validation error confirmed |
| ST-015 | US3/US4/US6 | Local storage persistence | Pass | Data remains after refresh |

## Result Summary

- Passed: 14
- Conditional Pass: 1
- Failed: 0
- Critical open bugs: 0
- High-priority open bugs: 0

## Remaining Attention Item

BUG-003 is still marked as In Progress because spending trend sorting should be checked again with unordered month data before the Week 10 demo.

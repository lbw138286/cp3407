# Final System Test Results

| Test ID | Linked US | Test summary | Result | Evidence |
|---|---|---|---|---|
| ST-001 | US1 | Register valid user | Pass | Backend automated test |
| ST-002 | US2 | Secure login / invalid password | Pass | Backend automated tests |
| ST-003 | US3 | Add expense | Pass | UI/API + automated test |
| ST-004 | US4 | Edit expense | Pass | UI/API + automated test |
| ST-005 | US4 | Delete expense | Pass | UI/API + automated test |
| ST-006 | US5 | Category validation and filter | Pass | Automated tests |
| ST-007 | US6 | Set persistent monthly budget | Pass | SQLite API test |
| ST-008 | US7 | Safe/warning/over alert states | Pass | Automated tests |
| ST-009 | US8 | Monthly report and month exclusion | Pass | Automated tests |
| ST-010 | US9 | Chronological trend analysis | Pass | BUG-003 regression test |
| ST-011 | US10 | Admin list accounts | Pass | Backend test |
| ST-012 | US10 | Update role/status | Pass | Backend test |
| ST-013 | US10 | Disable login | Pass | Backend test |
| ST-014 | US10 | Delete user and related data | Pass | Backend test |
| ST-015 | All | Relational persistence | Pass | SQLite database-backed API |

Final result: 15 passed, 0 conditional, 0 failed. BUG-003 is closed.

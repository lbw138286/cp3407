# Final Bug Log

| Bug | Linked US | Problem | Resolution | Final status |
|---|---|---|---|---|
| BUG-001 | US7 | Budget threshold boundary needed confirmation | Added tests for safe, warning and over-budget states | Done |
| BUG-002 | US8 | Monthly report could include the wrong month | Database query filters by `YYYY-MM`; regression test added | Done |
| BUG-003 | US9 | Unordered month input produced an incorrect trend | Sort month keys chronologically before comparison; regression test added | Done |
| BUG-004 | US2/US10 | Demo login used plain client-side passwords | Replaced with server-side scrypt hashing, database sessions and authorization checks | Done |
| BUG-005 | US5 | Category names could become inconsistent | Enforced a categories table, foreign key and fixed allowed values | Done |
| BUG-006 | US10 | Administrator could only view users | Added role/status update, disable and delete operations | Done |
| BUG-007 | Database | Demo used localStorage as the primary data store | Replaced with an executable relational SQLite database | Done |

Critical open bugs: 0. High-priority open bugs: 0.

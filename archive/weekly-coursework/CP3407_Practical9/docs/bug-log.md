# Practical 9 - Bug Log

## Bug Log Summary

| Bug ID | Linked US | Bug Summary | Severity | Priority | Status | Assignee | Evidence / Fix Plan |
|---|---|---|---|---|---|---|---|
| BUG-001 | US7 | Budget alert threshold does not clearly separate safe, warning, and over-budget states | High | High | Done | Team Member 1 | Retested alert logic with safe, warning, and over-budget data |
| BUG-002 | US8 | Monthly report may include expenses from outside the selected month if date filtering is incorrect | High | High | Done | Team Member 2 | Added selected-month filtering check in system test plan |
| BUG-003 | US9 | Spending trend result may be misleading if monthly data is not sorted in chronological order | Medium | Medium | In Progress | Team Member 3 | Need to verify trend order in demo data |
| BUG-004 | US10 | Login form should reject empty email or password before checking authentication | Medium | High | Done | Team Member 1 | Verified missing input handling with mock login tests |
| BUG-005 | US5 | Category filter may fail if category naming is inconsistent, such as Food vs food | Low | Medium | Todo | Team Member 2 | Add normalization or fixed category options |

## Detailed Bug Reports

### BUG-001 - Budget Alert Threshold Issue

- **Linked User Story:** US7 Receive Budget Alerts
- **Severity:** High
- **Priority:** High
- **Status:** Done
- **Description:** The system must show correct budget alert status based on total monthly spending.
- **Steps to reproduce:**
  1. Set monthly budget to 1000.
  2. Add expenses totalling 700.
  3. Add expenses totalling 850.
  4. Add expenses totalling 1050.
- **Expected result:**
  - 700 should show safe.
  - 850 should show warning.
  - 1050 should show over-budget.
- **Actual result:** Initial testing required clearer threshold checking.
- **Fix / action:** Alert logic is checked using system testing and automated tests.
- **Retest result:** Passed.

### BUG-002 - Monthly Report Date Filtering Issue

- **Linked User Story:** US8 Generate Monthly Financial Reports
- **Severity:** High
- **Priority:** High
- **Status:** Done
- **Description:** The report must only include expenses from the selected month.
- **Steps to reproduce:**
  1. Add one expense in July.
  2. Add one expense in August.
  3. Generate July report.
- **Expected result:** Only July expense should be included.
- **Actual result:** Risk found during review: report logic must be checked carefully.
- **Fix / action:** System test case added to verify selected-month filtering.
- **Retest result:** Passed.

### BUG-003 - Spending Trend Sorting Issue

- **Linked User Story:** US9 Analyze Spending Trends
- **Severity:** Medium
- **Priority:** Medium
- **Status:** In Progress
- **Description:** Trend analysis should display monthly spending in chronological order.
- **Steps to reproduce:**
  1. Add expenses across March, January, and February.
  2. Generate trend analysis.
- **Expected result:** Months should be shown as January, February, March.
- **Actual result:** Needs verification with unordered input data.
- **Fix / action:** Add sorting check before Week 10 demo.

### BUG-004 - Empty Login Input Issue

- **Linked User Story:** US10 Secure Account Login
- **Severity:** Medium
- **Priority:** High
- **Status:** Done
- **Description:** Login should reject empty email or password before authentication.
- **Steps to reproduce:**
  1. Open login form.
  2. Leave email or password empty.
  3. Click login.
- **Expected result:** System should show validation error.
- **Actual result:** Mock testing confirmed validation was required.
- **Fix / action:** Missing input test added.
- **Retest result:** Passed.

### BUG-005 - Category Naming Consistency Issue

- **Linked User Story:** US5 Categorize Expenses
- **Severity:** Low
- **Priority:** Medium
- **Status:** Todo
- **Description:** Category filtering should be consistent even if input text uses different case.
- **Steps to reproduce:**
  1. Add one category as Food.
  2. Add another category as food.
  3. Filter by Food.
- **Expected result:** Both records should be handled consistently or category input should be restricted.
- **Actual result:** Current category strategy should be reviewed.
- **Fix / action:** Use dropdown categories or normalize category names.

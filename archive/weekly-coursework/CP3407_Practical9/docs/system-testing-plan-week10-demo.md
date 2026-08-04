# Practical 9 - System Testing Plan for Week 10 Demo

## Purpose

This system testing plan prepares the Smart Expense Tracker Web Application for the Week 10 demo. The goal is to test the system as a complete application instead of only testing individual functions.

## System under test

Smart Expense Tracker Web Application.

## Scope

The system testing will cover:

1. Expense record creation.
2. Expense record editing and deletion.
3. Expense categorization.
4. Monthly budget setting.
5. Budget alert checking.
6. Monthly financial report generation.
7. Spending trend analysis.
8. Secure login behaviour using mock login.
9. Local storage persistence.
10. Basic UI flow for demo readiness.

## Out of scope

The following are not fully covered in this demo testing plan:

- Real online banking connection.
- Real payment system integration.
- Real multi-user server database.
- Production-level authentication server.

## Test environment

| Item | Description |
|---|---|
| Device | Laptop / desktop browser |
| Browser | Chrome or Edge |
| Application | Local HTML/JavaScript demo |
| Data storage | Browser local storage and test data |
| Test method | Manual system testing + existing automated tests |

## System Test Cases

### ST-001 Add an expense

- **Linked US:** US3 Add Expenses
- **Steps:**
  1. Open the application.
  2. Enter title: Lunch.
  3. Enter amount: 15.
  4. Select category: Food.
  5. Select date: 2026-07-28.
  6. Click Add Expense.
- **Expected result:** Expense appears in the expense table.
- **Status:** Ready for demo.

### ST-002 Edit an expense

- **Linked US:** US4 Edit and Delete Expenses
- **Steps:**
  1. Select an existing expense.
  2. Change amount from 15 to 18.
  3. Save changes.
- **Expected result:** Expense table shows updated value.
- **Status:** Ready for demo.

### ST-003 Delete an expense

- **Linked US:** US4 Edit and Delete Expenses
- **Steps:**
  1. Select an existing expense.
  2. Click Delete.
- **Expected result:** Expense is removed from the table.
- **Status:** Ready for demo.

### ST-004 Filter expenses by category

- **Linked US:** US5 Categorize Expenses
- **Steps:**
  1. Add expenses in Food and Transport categories.
  2. Filter by Food.
- **Expected result:** Only Food expenses are displayed.
- **Status:** Ready for demo.

### ST-005 Set monthly budget

- **Linked US:** US6 Set Monthly Budgets
- **Steps:**
  1. Enter monthly budget amount: 1000.
  2. Save budget.
- **Expected result:** Budget is saved and displayed.
- **Status:** Ready for demo.

### ST-006 Budget alert - safe status

- **Linked US:** US7 Receive Budget Alerts
- **Steps:**
  1. Set budget to 1000.
  2. Add expenses totalling 500.
- **Expected result:** System shows safe status or no warning.
- **Status:** Ready for demo.

### ST-007 Budget alert - warning status

- **Linked US:** US7 Receive Budget Alerts
- **Steps:**
  1. Set budget to 1000.
  2. Add expenses totalling 850.
- **Expected result:** System shows warning status.
- **Status:** Ready for demo.

### ST-008 Budget alert - over-budget status

- **Linked US:** US7 Receive Budget Alerts
- **Steps:**
  1. Set budget to 1000.
  2. Add expenses totalling 1050.
- **Expected result:** System shows over-budget alert.
- **Status:** Ready for demo.

### ST-009 Generate monthly financial report

- **Linked US:** US8 Generate Monthly Financial Reports
- **Steps:**
  1. Add several expenses in July.
  2. Generate July report.
- **Expected result:** Report shows July total spending and category totals.
- **Status:** Ready for demo.

### ST-010 Check report does not include wrong month

- **Linked US:** US8 Generate Monthly Financial Reports
- **Steps:**
  1. Add one July expense.
  2. Add one August expense.
  3. Generate July report.
- **Expected result:** August expense is not included.
- **Status:** Ready for demo.

### ST-011 Analyze spending trends

- **Linked US:** US9 Analyze Spending Trends
- **Steps:**
  1. Add expenses in January, February, and March.
  2. Generate trend analysis.
- **Expected result:** System shows spending change across months.
- **Status:** Needs final trend sorting check.

### ST-012 Mock login success

- **Linked US:** US10 Secure Account Login
- **Steps:**
  1. Enter valid mock email and password.
  2. Submit login.
- **Expected result:** Login succeeds.
- **Status:** Ready for demo.

### ST-013 Mock login failure

- **Linked US:** US10 Secure Account Login
- **Steps:**
  1. Enter invalid mock credentials.
  2. Submit login.
- **Expected result:** Login fails with error message.
- **Status:** Ready for demo.

### ST-014 Missing login input

- **Linked US:** US10 Secure Account Login
- **Steps:**
  1. Leave email or password blank.
  2. Submit login.
- **Expected result:** Validation error is shown.
- **Status:** Ready for demo.

### ST-015 Local storage persistence

- **Linked US:** US3 / US4 / US6
- **Steps:**
  1. Add expenses and set budget.
  2. Refresh browser.
- **Expected result:** Saved data remains available.
- **Status:** Ready for demo.

## Entry Criteria

- Core features are implemented.
- Test data is prepared.
- GitHub project board is updated.
- Known critical bugs are fixed or documented.

## Exit Criteria

- Main demo user flows pass.
- Critical and high-priority bugs are fixed.
- Remaining bugs are documented with issue status.
- Instructor has repository access or invitation evidence is prepared.

# Practical 7: User Story Test Cases

## US3: Add Expenses

| Test Case ID | Test Case | Precondition | Test Data | Expected Result |
|---|---|---|---|---|
| US3-TC01 | Add a valid expense | Expense list exists | Title: Coffee, Amount: 5.5, Category: Food, Date: 2026-07-03 | A new expense is added with a new ID |
| US3-TC02 | Reject zero or negative amount | Expense form is open | Amount: 0 | System rejects the expense and shows validation error |
| US3-TC03 | Reject missing required fields | Expense form is open | Empty title, amount, or date | System returns required field errors |

## US4: Edit and Delete Expenses

| Test Case ID | Test Case | Precondition | Test Data | Expected Result |
|---|---|---|---|---|
| US4-TC01 | Edit an existing expense | Expense record exists | Change title and amount | Existing record is updated |
| US4-TC02 | Delete an existing expense | Expense record exists | Expense ID: 2 | Selected expense is removed |
| US4-TC03 | Edit or delete missing expense | Expense ID does not exist | Expense ID: 999 | System shows record not found error |

## US5: Categorize Expenses

| Test Case ID | Test Case | Precondition | Test Data | Expected Result |
|---|---|---|---|---|
| US5-TC01 | Filter expenses by category | Multiple categories exist | Category: Food | Only Food expenses are displayed |
| US5-TC02 | Summarize spending by category | Multiple expenses exist | Food, Transport, Education expenses | Category totals are calculated correctly |
| US5-TC03 | Reject invalid category | User adds expense | Category: Unknown | System rejects the invalid category |

## US6: Set Monthly Budgets

| Test Case ID | Test Case | Precondition | Test Data | Expected Result |
|---|---|---|---|---|
| US6-TC01 | Set a valid monthly budget | Budget form is open | Limit: 100 | Monthly budget is created |
| US6-TC02 | Reject invalid budget | Budget form is open | Limit: -100 or abc | System rejects invalid budget |
| US6-TC03 | Calculate monthly spending | Expenses exist in different months | Month: 2026-07 | Only July expenses are included |

## US7: Receive Budget Alerts

| Test Case ID | Test Case | Precondition | Test Data | Expected Result |
|---|---|---|---|---|
| US7-TC01 | No alert when spending is safe | Budget exists | Spending below 80% | System returns safe status |
| US7-TC02 | Warning alert near budget limit | Budget exists | Spending at least 80% | System returns warning status |
| US7-TC03 | Over-budget alert | Budget exists | Spending exceeds limit | System returns over-budget alert |

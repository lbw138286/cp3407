# Practical 7: TDD Discussion and Testing Plan

## Project
Smart Expense Tracker Web Application

## Objective
The objective of Practical 7 is to apply Test-Driven Development (TDD) to the project and document the testing that can be performed.

## TDD approach used
The development approach follows a test-first style:

1. Write a failing test case for the expected behaviour.
2. Implement the simplest function to pass the test.
3. Refactor the code while keeping all tests passing.
4. Repeat the process for the next behaviour.

This practical focuses on automated unit tests because the core expense tracker functions can be tested without depending on the browser user interface.

## Selected testing scope
The tests focus on five user stories:

- US3: Add Expenses
- US4: Edit and Delete Expenses
- US5: Categorize Expenses
- US6: Set Monthly Budgets
- US7: Receive Budget Alerts

## Testing levels that could be used in the project

### Unit testing
Unit tests are used for individual functions such as addExpense, editExpense, deleteExpense, filterExpensesByCategory, setMonthlyBudget, and getBudgetStatus.

### Integration testing
Integration testing can be used to check whether the form, expense table, local storage, and budget status work together correctly.

### System testing
System testing can be used to check the whole Smart Expense Tracker workflow from the user perspective.

### User acceptance testing
User acceptance testing can be used to verify whether the application satisfies the expected needs of students, working adults, and small business owners.

## Testing risks
- Browser UI behaviour may not be fully covered by unit tests.
- Local storage behaviour needs browser-based testing in addition to function-level tests.
- Budget alert logic must be tested carefully because incorrect alerts can mislead users.
- Invalid input must be tested to prevent incorrect financial records.

## Tools used
- JavaScript
- Node.js built-in test runner
- Node.js assert/strict
- Automated test file: tests/expenseManager.test.js

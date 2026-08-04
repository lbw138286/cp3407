# Practical 6: SRP and DRY Review

Project: Smart Expense Tracker Web Application  
Focus: Check current classes and code structure against SRP and DRY.

## SRP Review

SRP means each class or module should have one clear responsibility and one main reason to change.

| Component | Responsibility | SRP Result | Finding |
|---|---|---|---|
| User | Stores account-related user data and login/register behaviour | Satisfies SRP | The class focuses on user identity and account access only. |
| Expense | Represents one expense record | Satisfies SRP | The class stores expense data such as title, amount, category, and date. |
| ExpenseTracker | Manages the list of expenses and total spending | Mostly satisfies SRP | It is acceptable at the current project scale, but should not also handle UI rendering or storage directly in future iterations. |
| Budget | Stores monthly budget limit and checks spending against the budget | Satisfies SRP | The class focuses on budget rules only. |
| ReportGenerator | Generates reports and spending analysis | Satisfies SRP | Reporting is separated from expense input and storage. |
| StorageService | Saves and loads expense and budget data | Satisfies SRP | Storage logic is separated from business logic. |
| script.js | Handles form events, validation, business logic, rendering, and local storage | Partially violates SRP | The current JavaScript file works, but it contains too many responsibilities. It should be split into smaller modules later. |

## DRY Review

DRY means repeated logic should be reduced so the same rule or behaviour is not written in many places.

| Area Checked | DRY Result | Finding | Suggested Improvement |
|---|---|---|---|
| Local storage key | Good | A single `STORAGE_KEY` constant is used. | Keep using central constants for storage keys. |
| Save expenses logic | Good | `saveExpenses()` is reused for add, edit, and delete actions. | Keep this as a shared function. |
| HTML escaping | Good | `escapeHtml()` is centralized before rendering table data. | Keep this function for safe display. |
| Form data reading | Needs improvement | `handleSubmit()` directly reads every input field. | Create a `getFormData()` helper function. |
| UI reset logic | Good | `resetForm()` centralizes form reset behaviour. | Keep using this helper. |
| Rendering table rows | Needs improvement | Row generation is inside `renderExpenses()`. | Create a smaller `createExpenseRow()` function if the table grows. |
| Add/edit/delete workflow | Acceptable but can improve | Save, render, and reset steps repeat after data changes. | Create an `updateAfterChange()` helper to reduce repeated workflow logic. |

## Main Findings

The project design mostly satisfies SRP at the class diagram level because each class has a clear purpose. However, the current JavaScript implementation is still simple and centralized in one file, so it partially violates SRP. This is acceptable for the first iteration, but it should be refactored as the project grows.

DRY is mostly satisfied because common logic such as storage saving, form reset, and HTML escaping are already separated into reusable functions. The main improvement for Iteration 2 is to reduce repeated UI workflow code and introduce helper functions for form data handling and table row creation.

## Planned Refactoring for Iteration 2

| Refactoring Task | Priority | Status |
|---|---|---|
| Create `getFormData()` helper | Medium | Todo |
| Create `updateAfterChange()` helper | Medium | Todo |
| Keep budget calculation separate from expense rendering | High | Todo |
| Keep category logic separate from local storage logic | High | Todo |

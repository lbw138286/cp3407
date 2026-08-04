# UI Designs and User Stories as Test Specifications

Practical 8 requires the use of UI designs together with user stories as test specifications for the TDD process.

## UI-based test specification approach

For each Iteration 3 user story, the expected UI behaviour was converted into testable conditions. The tests were written around the visible behaviour users expect from the Smart Expense Tracker interface.

## UI and user story mapping

| User Story | UI Area | Expected UI Behaviour | Test Specification |
|---|---|---|---|
| US7: Receive Budget Alerts | Budget alert message area | The UI should show safe, warning, or over-budget status based on total monthly spending. | Test budget status logic for safe, warning, and over-budget states. |
| US8: Generate Monthly Financial Reports | Monthly report section | The UI should show selected month, total spending, number of expenses, category totals, and top spending category. | Test monthly report generation for correct month, total, category totals, and top category. |
| US9: Analyze Spending Trends | Spending trend section | The UI should show whether spending is increasing, decreasing, stable, or insufficient data. | Test trend analysis using monthly totals. |
| US10: Secure Account Login | Login form | The UI should accept valid credentials, reject invalid credentials, and avoid checking the database if input is invalid. | Test login behaviour using a mock authentication repository. |

## TDD process used

1. Write test cases based on the user story and expected UI behaviour.
2. Run the tests and confirm they fail before implementation.
3. Implement only enough code to make the tests pass.
4. Refactor the logic into small reusable functions.
5. Run the tests again and record the final output.

## Why this is useful

Using UI expectations as test specifications makes the tests closer to user needs. Instead of testing only internal code details, the tests check whether the system produces the result that the user should see on the screen.

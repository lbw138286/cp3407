# Iteration 3 User Story Test Cases

## US7: Receive Budget Alerts

| Test Case | Description | Test Data | Expected Result |
|---|---|---|---|
| US7-TC01 | Spending is below warning threshold | Budget 100, spent 43 | Status is safe and alert is false. |
| US7-TC02 | Spending reaches warning threshold | Budget 50, spent 43 | Status is warning and alert is true. |
| US7-TC03 | Spending exceeds budget | Budget 40, spent 43 | Status is over and alert is true. |

## US8: Generate Monthly Financial Reports

| Test Case | Description | Test Data | Expected Result |
|---|---|---|---|
| US8-TC01 | Generate report for selected month only | Expenses from July and August | August report excludes July expense. |
| US8-TC02 | Calculate category totals | Food and Transport expenses | Food total is 40 and Transport total is 3. |
| US8-TC03 | Identify top category | Food has highest total | Top category is Food. |

## US9: Analyze Spending Trends

| Test Case | Description | Test Data | Expected Result |
|---|---|---|---|
| US9-TC01 | Detect increasing trend | 80, 120, 150 | Direction is increasing. |
| US9-TC02 | Detect decreasing trend | 150, 110, 90 | Direction is decreasing. |
| US9-TC03 | Handle insufficient data | One monthly total only | Direction is not_enough_data. |

## US10: Secure Account Login with Mock Object Testing

| Test Case | Description | Test Data | Expected Result |
|---|---|---|---|
| US10-TC01 | Login succeeds with mock repository | Correct email and password | Success is true and token is returned. |
| US10-TC02 | Login fails with wrong password | Correct email, wrong password | Success is false and error is returned. |
| US10-TC03 | Invalid input does not call repository | Empty email and password | Validation errors are returned and mock repository is not called. |

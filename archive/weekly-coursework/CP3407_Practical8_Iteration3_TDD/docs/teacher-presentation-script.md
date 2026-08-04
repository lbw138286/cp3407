# Teacher Presentation Script

## Step 1: Show README.md

This is my Practical 8 submission for Iteration 3. The objective is to practise test-driven development. The package includes Iteration 2 reflection, velocity calculation, a burn down rate graph, updated Iteration 3 backlog, GitHub board tracking, GitHub Pages content, mock object research, and automated tests.

## Step 2: Show docs/velocity-calculation-iteration2.md

For Iteration 2, our team had 3 members and 4 working days, so the total capacity was 12 person-days. We completed US5 Categorize Expenses and US6 Set Monthly Budgets. Each was estimated at 6 person-days, so the actual velocity of Iteration 2 is 12 person-days.

## Step 3: Show burndown-rate-graph-iteration2.png

This graph shows the burn down rate for Iteration 2. It starts from 12 person-days of work left and decreases to 0. It shows that the team completed the planned workload by the end of the iteration.

## Step 4: Show docs/iteration3-backlog-update.md

I used the velocity from Iteration 2 to update the Iteration 3 backlog. Since the velocity was 12 person-days, I planned 12 person-days of work for Iteration 3. The selected user stories are US7 Budget Alerts, US8 Monthly Reports, US9 Spending Trends, and US10 Secure Login with Mock Object Testing.

## Step 5: Show docs/ui-user-story-test-specifications.md

For Practical 8, I used UI designs and user stories as test specifications. For example, the budget alert UI should show safe, warning, or over-budget status. The monthly report UI should show total spending and category totals. The login UI is tested using a mock authentication repository.

## Step 6: Show docs/mock-object-framework-research.md

I researched mock objects and applied them to the login process. Instead of using a real database or authentication server, I created a mock authentication repository. This allows the login logic to be tested independently.

## Step 7: Show tests/iteration3.test.js

This file contains the automated tests for Iteration 3. There are tests for US7, US8, US9, and US10. The login tests use a mock object to simulate user login.

## Step 8: Show docs/node-test-output.txt or run npm test

The test output shows that all 12 automated tests passed with 0 failed tests. This provides evidence that the Iteration 3 logic was tested successfully.

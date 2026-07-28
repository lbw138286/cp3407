# Practical 9 - GitHub Issues to Create

## BUG-001: Budget alert threshold states are unclear

**Labels:** bug, system-testing, high-priority, done  
**Linked User Story:** US7 Receive Budget Alerts  
**Description:** Budget alert logic needs to clearly return safe, warning, or over-budget state based on monthly spending.  
**Steps to reproduce:** Set budget to 1000, test spending at 700, 850, and 1050.  
**Expected result:** 700 = safe, 850 = warning, 1050 = over-budget.  
**Status:** Done.

## BUG-002: Monthly report includes wrong month data risk

**Labels:** bug, system-testing, high-priority, done  
**Linked User Story:** US8 Generate Monthly Financial Reports  
**Description:** Monthly report should only include expenses from the selected month.  
**Steps to reproduce:** Add July and August expenses, then generate July report.  
**Expected result:** Only July expenses are included.  
**Status:** Done.

## BUG-003: Spending trend should sort months chronologically

**Labels:** bug, system-testing, medium-priority, in-progress  
**Linked User Story:** US9 Analyze Spending Trends  
**Description:** Trend analysis should show months in chronological order even if expenses are entered in random order.  
**Expected result:** January, February, March order should be shown correctly.  
**Status:** In Progress.

## BUG-004: Login should reject missing email or password

**Labels:** bug, system-testing, high-priority, done  
**Linked User Story:** US10 Secure Account Login  
**Description:** Login should validate missing email or password before calling authentication logic.  
**Expected result:** Validation error is shown.  
**Status:** Done.

## BUG-005: Category filter should handle inconsistent category names

**Labels:** bug, system-testing, medium-priority, todo  
**Linked User Story:** US5 Categorize Expenses  
**Description:** Category filtering may be inconsistent if users type categories with different letter cases.  
**Expected result:** Category values should be normalised or selected from fixed options.  
**Status:** Todo.

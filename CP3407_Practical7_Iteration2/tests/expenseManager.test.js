import test from "node:test";
import assert from "node:assert/strict";

import {
  ALLOWED_CATEGORIES,
  addExpense,
  editExpense,
  deleteExpense,
  filterExpensesByCategory,
  summarizeByCategory,
  setMonthlyBudget,
  calculateMonthlySpending,
  getBudgetStatus,
  validateExpenseData
} from "../src/expenseManager.js";

const sampleExpenses = [
  { expenseId: 1, title: "Lunch", amount: 12, category: "Food", date: "2026-07-01" },
  { expenseId: 2, title: "Bus", amount: 3, category: "Transport", date: "2026-07-01" },
  { expenseId: 3, title: "Dinner", amount: 18, category: "Food", date: "2026-07-02" },
  { expenseId: 4, title: "Textbook", amount: 40, category: "Education", date: "2026-06-20" }
];

test("US3-TC01 adds a valid expense with a new expenseId", () => {
  const result = addExpense(sampleExpenses, {
    title: "Coffee",
    amount: 5.5,
    category: "Food",
    date: "2026-07-03"
  });

  assert.equal(result.length, 5);
  assert.equal(result[4].expenseId, 5);
  assert.equal(result[4].title, "Coffee");
});

test("US3-TC02 rejects an expense with zero or negative amount", () => {
  assert.throws(
    () => addExpense(sampleExpenses, {
      title: "Invalid item",
      amount: 0,
      category: "Food",
      date: "2026-07-03"
    }),
    /greater than zero/
  );
});

test("US3-TC03 rejects an expense with missing required fields", () => {
  const errors = validateExpenseData({
    title: "",
    amount: "",
    category: "Food",
    date: ""
  });

  assert.ok(errors.includes("Expense title is required."));
  assert.ok(errors.includes("Expense amount must be greater than zero."));
  assert.ok(errors.includes("Valid expense date is required."));
});

test("US4-TC01 edits an existing expense record", () => {
  const result = editExpense(sampleExpenses, 1, {
    title: "Updated Lunch",
    amount: 15
  });

  assert.equal(result[0].title, "Updated Lunch");
  assert.equal(result[0].amount, 15);
  assert.equal(result[0].category, "Food");
});

test("US4-TC02 deletes an existing expense record", () => {
  const result = deleteExpense(sampleExpenses, 2);

  assert.equal(result.length, 3);
  assert.equal(result.some((expense) => expense.expenseId === 2), false);
});

test("US4-TC03 shows an error when editing or deleting a missing record", () => {
  assert.throws(() => editExpense(sampleExpenses, 999, { title: "Missing" }), /not found/);
  assert.throws(() => deleteExpense(sampleExpenses, 999), /not found/);
});

test("US5-TC01 filters expenses by category", () => {
  const result = filterExpensesByCategory(sampleExpenses, "Food");

  assert.equal(result.length, 2);
  assert.ok(result.every((expense) => expense.category === "Food"));
});

test("US5-TC02 summarizes total spending by category", () => {
  const result = summarizeByCategory(sampleExpenses);

  assert.equal(result.Food, 30);
  assert.equal(result.Transport, 3);
  assert.equal(result.Education, 40);
});

test("US5-TC03 rejects an expense with an invalid category", () => {
  assert.equal(ALLOWED_CATEGORIES.includes("Unknown"), false);

  assert.throws(
    () => addExpense(sampleExpenses, {
      title: "Random",
      amount: 10,
      category: "Unknown",
      date: "2026-07-03"
    }),
    /category is invalid/
  );
});

test("US6-TC01 creates a valid monthly budget", () => {
  const budget = setMonthlyBudget(100);

  assert.equal(budget.monthlyLimit, 100);
  assert.equal(budget.currentSpent, 0);
});

test("US6-TC02 rejects invalid monthly budget values", () => {
  assert.throws(() => setMonthlyBudget(-100), /greater than zero/);
  assert.throws(() => setMonthlyBudget("abc"), /greater than zero/);
});

test("US6-TC03 calculates monthly spending for the selected month only", () => {
  const total = calculateMonthlySpending(sampleExpenses, "2026-07");

  assert.equal(total, 33);
});

test("US7-TC01 returns safe status when spending is below 80 percent of budget", () => {
  const budget = setMonthlyBudget(100);
  const status = getBudgetStatus(sampleExpenses, budget, "2026-07");

  assert.equal(status.status, "safe");
  assert.equal(status.alert, false);
});

test("US7-TC02 returns warning status when spending reaches at least 80 percent of budget", () => {
  const budget = setMonthlyBudget(40);
  const status = getBudgetStatus(sampleExpenses, budget, "2026-07");

  assert.equal(status.status, "warning");
  assert.equal(status.alert, true);
});

test("US7-TC03 returns over-budget status when spending exceeds budget limit", () => {
  const budget = setMonthlyBudget(30);
  const status = getBudgetStatus(sampleExpenses, budget, "2026-07");

  assert.equal(status.status, "over");
  assert.equal(status.alert, true);
  assert.equal(status.remaining, -3);
});

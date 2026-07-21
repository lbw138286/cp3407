import test, { mock } from "node:test";
import assert from "node:assert/strict";

import {
  setMonthlyBudget,
  getBudgetStatus,
  generateMonthlyReport,
  analyzeSpendingTrend
} from "../src/expenseManager.js";
import { loginUser, validateLoginInput } from "../src/authService.js";

const sampleExpenses = [
  { expenseId: 1, title: "Lunch", amount: 12, category: "Food", date: "2026-08-01" },
  { expenseId: 2, title: "Bus", amount: 3, category: "Transport", date: "2026-08-01" },
  { expenseId: 3, title: "Dinner", amount: 28, category: "Food", date: "2026-08-03" },
  { expenseId: 4, title: "Textbook", amount: 40, category: "Education", date: "2026-07-20" }
];

test("US7-TC01 shows safe budget status when spending is below the warning threshold", () => {
  const budget = setMonthlyBudget(100);
  const status = getBudgetStatus(sampleExpenses, budget, "2026-08");

  assert.equal(status.status, "safe");
  assert.equal(status.alert, false);
  assert.equal(status.spent, 43);
});

test("US7-TC02 shows warning budget status when spending reaches 80 percent of the limit", () => {
  const budget = setMonthlyBudget(50);
  const status = getBudgetStatus(sampleExpenses, budget, "2026-08");

  assert.equal(status.status, "warning");
  assert.equal(status.alert, true);
  assert.equal(status.message, "Budget is close to the monthly limit.");
});

test("US7-TC03 shows over-budget status when spending exceeds the monthly limit", () => {
  const budget = setMonthlyBudget(40);
  const status = getBudgetStatus(sampleExpenses, budget, "2026-08");

  assert.equal(status.status, "over");
  assert.equal(status.alert, true);
  assert.equal(status.remaining, -3);
});

test("US8-TC01 generates a monthly report for the selected month only", () => {
  const report = generateMonthlyReport(sampleExpenses, "2026-08");

  assert.equal(report.month, "2026-08");
  assert.equal(report.expenseCount, 3);
  assert.equal(report.totalSpent, 43);
});

test("US8-TC02 calculates spending totals by category in the monthly report", () => {
  const report = generateMonthlyReport(sampleExpenses, "2026-08");

  assert.equal(report.categoryTotals.Food, 40);
  assert.equal(report.categoryTotals.Transport, 3);
  assert.equal(report.categoryTotals.Education, undefined);
});

test("US8-TC03 identifies the highest spending category in the monthly report", () => {
  const report = generateMonthlyReport(sampleExpenses, "2026-08");

  assert.equal(report.topCategory, "Food");
});

test("US9-TC01 detects an increasing spending trend", () => {
  const trend = analyzeSpendingTrend([
    { month: "2026-06", total: 80 },
    { month: "2026-07", total: 120 },
    { month: "2026-08", total: 150 }
  ]);

  assert.equal(trend.direction, "increasing");
  assert.equal(trend.change, 70);
});

test("US9-TC02 detects a decreasing spending trend", () => {
  const trend = analyzeSpendingTrend([
    { month: "2026-06", total: 150 },
    { month: "2026-07", total: 110 },
    { month: "2026-08", total: 90 }
  ]);

  assert.equal(trend.direction, "decreasing");
  assert.equal(trend.change, -60);
});

test("US9-TC03 handles insufficient spending trend data", () => {
  const trend = analyzeSpendingTrend([{ month: "2026-08", total: 90 }]);

  assert.equal(trend.direction, "not_enough_data");
  assert.equal(trend.change, 0);
});

test("US10-TC01 logs in successfully with a mock authentication repository", async () => {
  const mockRepository = {
    findUserByEmail: mock.fn(async (email) => ({
      userId: 1,
      name: "Demo User",
      email,
      password: "correct-password"
    }))
  };

  const result = await loginUser(
    { email: "demo@example.com", password: "correct-password" },
    mockRepository
  );

  assert.equal(result.success, true);
  assert.equal(result.user.email, "demo@example.com");
  assert.equal(result.token, "mock-token-1");
  assert.equal(mockRepository.findUserByEmail.mock.callCount(), 1);
});

test("US10-TC02 rejects an incorrect password using a mock authentication repository", async () => {
  const mockRepository = {
    findUserByEmail: mock.fn(async (email) => ({
      userId: 1,
      name: "Demo User",
      email,
      password: "correct-password"
    }))
  };

  const result = await loginUser(
    { email: "demo@example.com", password: "wrong-password" },
    mockRepository
  );

  assert.equal(result.success, false);
  assert.deepEqual(result.errors, ["Invalid email or password."]);
  assert.equal(result.token, null);
});

test("US10-TC03 validates login input before calling the authentication repository", async () => {
  const mockRepository = {
    findUserByEmail: mock.fn(async () => {
      throw new Error("Repository should not be called for invalid input.");
    })
  };

  const inputErrors = validateLoginInput("", "");
  const result = await loginUser({ email: "", password: "" }, mockRepository);

  assert.ok(inputErrors.includes("Email is required."));
  assert.ok(inputErrors.includes("Password is required."));
  assert.equal(result.success, false);
  assert.equal(mockRepository.findUserByEmail.mock.callCount(), 0);
});

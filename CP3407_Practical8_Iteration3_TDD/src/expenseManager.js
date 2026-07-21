export const ALLOWED_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Business",
  "Education",
  "Other"
];

export function validateExpenseData(expenseData) {
  const errors = [];

  if (!expenseData || typeof expenseData !== "object") {
    return ["Expense data is required."];
  }

  const title = String(expenseData.title ?? "").trim();
  const amount = Number(expenseData.amount);
  const category = String(expenseData.category ?? "").trim();
  const date = String(expenseData.date ?? "").trim();

  if (!title) {
    errors.push("Expense title is required.");
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    errors.push("Expense amount must be greater than zero.");
  }

  if (!ALLOWED_CATEGORIES.includes(category)) {
    errors.push("Expense category is invalid.");
  }

  if (!date || Number.isNaN(Date.parse(date))) {
    errors.push("Valid expense date is required.");
  }

  return errors;
}

export function createExpense(expenseData, existingExpenses = []) {
  const errors = validateExpenseData(expenseData);

  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }

  const currentMaxId = existingExpenses.reduce(
    (maxId, expense) => Math.max(maxId, Number(expense.expenseId) || 0),
    0
  );

  return {
    expenseId: currentMaxId + 1,
    title: String(expenseData.title).trim(),
    amount: Number(expenseData.amount),
    category: String(expenseData.category).trim(),
    date: String(expenseData.date).trim()
  };
}

export function addExpense(expenses, expenseData) {
  const currentExpenses = Array.isArray(expenses) ? expenses : [];
  const newExpense = createExpense(expenseData, currentExpenses);
  return [...currentExpenses, newExpense];
}

export function editExpense(expenses, expenseId, updatedData) {
  const targetId = Number(expenseId);
  const currentExpenses = Array.isArray(expenses) ? expenses : [];
  const existingExpense = currentExpenses.find((expense) => expense.expenseId === targetId);

  if (!existingExpense) {
    throw new Error("Expense record was not found.");
  }

  const mergedExpense = {
    ...existingExpense,
    ...updatedData,
    expenseId: targetId
  };

  const errors = validateExpenseData(mergedExpense);
  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }

  return currentExpenses.map((expense) =>
    expense.expenseId === targetId ? mergedExpense : expense
  );
}

export function deleteExpense(expenses, expenseId) {
  const targetId = Number(expenseId);
  const currentExpenses = Array.isArray(expenses) ? expenses : [];
  const exists = currentExpenses.some((expense) => expense.expenseId === targetId);

  if (!exists) {
    throw new Error("Expense record was not found.");
  }

  return currentExpenses.filter((expense) => expense.expenseId !== targetId);
}

export function filterExpensesByCategory(expenses, category) {
  const selectedCategory = String(category ?? "").trim();
  return (Array.isArray(expenses) ? expenses : []).filter(
    (expense) => expense.category === selectedCategory
  );
}

export function summarizeByCategory(expenses) {
  return (Array.isArray(expenses) ? expenses : []).reduce((summary, expense) => {
    const category = expense.category || "Other";
    summary[category] = (summary[category] || 0) + Number(expense.amount || 0);
    return summary;
  }, {});
}

export function setMonthlyBudget(limit) {
  const monthlyLimit = Number(limit);

  if (!Number.isFinite(monthlyLimit) || monthlyLimit <= 0) {
    throw new Error("Monthly budget must be greater than zero.");
  }

  return {
    budgetId: 1,
    monthlyLimit,
    currentSpent: 0
  };
}

export function getMonthKey(dateString) {
  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Valid date is required.");
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function calculateMonthlySpending(expenses, monthKey) {
  return (Array.isArray(expenses) ? expenses : [])
    .filter((expense) => getMonthKey(expense.date) === monthKey)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0);
}

export function getBudgetStatus(expenses, budget, monthKey) {
  if (!budget || !Number.isFinite(Number(budget.monthlyLimit))) {
    throw new Error("Valid budget is required.");
  }

  const spent = calculateMonthlySpending(expenses, monthKey);
  const limit = Number(budget.monthlyLimit);
  const remaining = limit - spent;

  if (spent > limit) {
    return {
      month: monthKey,
      limit,
      spent,
      remaining,
      status: "over",
      alert: true,
      message: "Budget exceeded."
    };
  }

  if (spent >= limit * 0.8) {
    return {
      month: monthKey,
      limit,
      spent,
      remaining,
      status: "warning",
      alert: true,
      message: "Budget is close to the monthly limit."
    };
  }

  return {
    month: monthKey,
    limit,
    spent,
    remaining,
    status: "safe",
    alert: false,
    message: "Budget is within the safe range."
  };
}

export function generateMonthlyReport(expenses, monthKey) {
  const monthlyExpenses = (Array.isArray(expenses) ? expenses : []).filter(
    (expense) => getMonthKey(expense.date) === monthKey
  );
  const totalSpent = monthlyExpenses.reduce((total, expense) => total + Number(expense.amount || 0), 0);
  const categoryTotals = summarizeByCategory(monthlyExpenses);
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  return {
    month: monthKey,
    expenseCount: monthlyExpenses.length,
    totalSpent,
    categoryTotals,
    topCategory
  };
}

export function analyzeSpendingTrend(monthlyTotals) {
  if (!Array.isArray(monthlyTotals) || monthlyTotals.length < 2) {
    return {
      direction: "not_enough_data",
      change: 0,
      message: "At least two monthly totals are required."
    };
  }

  const first = Number(monthlyTotals[0].total);
  const last = Number(monthlyTotals[monthlyTotals.length - 1].total);
  const change = last - first;

  if (change > 0) {
    return { direction: "increasing", change, message: "Spending is increasing." };
  }
  if (change < 0) {
    return { direction: "decreasing", change, message: "Spending is decreasing." };
  }
  return { direction: "stable", change, message: "Spending is stable." };
}

import { addExpense, filterExpensesByCategory, setMonthlyBudget, getBudgetStatus, getMonthKey } from "./expenseManager.js";

const expenseForm = document.querySelector("#expenseForm");
const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const message = document.querySelector("#message");
const budgetLimitInput = document.querySelector("#budgetLimit");
const setBudgetBtn = document.querySelector("#setBudgetBtn");
const budgetStatus = document.querySelector("#budgetStatus");
const categoryFilter = document.querySelector("#categoryFilter");
const expenseTableBody = document.querySelector("#expenseTableBody");
let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
let budget = JSON.parse(localStorage.getItem("budget") || "null");

function saveExpenses() { localStorage.setItem("expenses", JSON.stringify(expenses)); }
function saveBudget() { localStorage.setItem("budget", JSON.stringify(budget)); }
function renderExpenses() {
  const visibleExpenses = categoryFilter.value ? filterExpensesByCategory(expenses, categoryFilter.value) : expenses;
  expenseTableBody.innerHTML = visibleExpenses.map((expense) => `<tr><td>${expense.title}</td><td>${expense.amount.toFixed(2)}</td><td>${expense.category}</td><td>${expense.date}</td></tr>`).join("");
}
function renderBudgetStatus() {
  if (!budget || expenses.length === 0) {
    budgetStatus.textContent = budget ? `Monthly budget set: ${budget.monthlyLimit.toFixed(2)}` : "No monthly budget set.";
    return;
  }
  const latestMonth = getMonthKey(expenses[expenses.length - 1].date);
  const status = getBudgetStatus(expenses, budget, latestMonth);
  budgetStatus.textContent = `${status.message} Spent: ${status.spent.toFixed(2)}, Limit: ${status.limit.toFixed(2)}, Remaining: ${status.remaining.toFixed(2)}.`;
}
expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    expenses = addExpense(expenses, { title: titleInput.value, amount: amountInput.value, category: categoryInput.value, date: dateInput.value });
    saveExpenses(); renderExpenses(); renderBudgetStatus(); expenseForm.reset(); message.textContent = "Expense added successfully.";
  } catch (error) { message.textContent = error.message; }
});
setBudgetBtn.addEventListener("click", () => {
  try { budget = setMonthlyBudget(budgetLimitInput.value); saveBudget(); renderBudgetStatus(); }
  catch (error) { budgetStatus.textContent = error.message; }
});
categoryFilter.addEventListener("change", renderExpenses);
renderExpenses(); renderBudgetStatus();

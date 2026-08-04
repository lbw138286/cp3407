import {
  addExpense,
  editExpense,
  deleteExpense,
  filterExpensesByCategory,
  setMonthlyBudget,
  getBudgetStatus,
  getMonthKey,
  generateMonthlyReport,
  analyzeSpendingTrend
} from "./expenseManager.js";
import { loginUser } from "./authService.js";

const storage = {
  get(key, fallback) { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

const defaultUsers = [
  { userId: 1, name: "Admin", email: "admin@example.com", password: "admin123", role: "admin" }
];
let users = storage.get("users", defaultUsers);
if (!users.length) users = defaultUsers;
let currentUser = storage.get("currentUser", null);
let expenses = storage.get("expenses", []);
let budget = storage.get("budget", null);

const $ = (selector) => document.querySelector(selector);
const registerForm = $("#registerForm");
const loginForm = $("#loginForm");
const currentUserView = $("#currentUser");
const logoutBtn = $("#logoutBtn");
const expenseForm = $("#expenseForm");
const expenseIdInput = $("#expenseId");
const titleInput = $("#title");
const amountInput = $("#amount");
const categoryInput = $("#category");
const dateInput = $("#date");
const submitExpenseBtn = $("#submitExpenseBtn");
const cancelEditBtn = $("#cancelEditBtn");
const expenseMessage = $("#expenseMessage");
const budgetLimitInput = $("#budgetLimit");
const setBudgetBtn = $("#setBudgetBtn");
const budgetStatus = $("#budgetStatus");
const categoryFilter = $("#categoryFilter");
const expenseTableBody = $("#expenseTableBody");
const reportMonth = $("#reportMonth");
const reportOutput = $("#reportOutput");
const userTableBody = $("#userTableBody");

function saveAll() {
  storage.set("users", users);
  storage.set("currentUser", currentUser);
  storage.set("expenses", expenses);
  storage.set("budget", budget);
}

function getUserExpenses() {
  if (!currentUser) return [];
  return expenses.filter((expense) => expense.ownerEmail === currentUser.email);
}

function replaceUserExpenses(newUserExpenses) {
  const otherExpenses = expenses.filter((expense) => expense.ownerEmail !== currentUser.email);
  expenses = [...otherExpenses, ...newUserExpenses];
}

function renderSession() {
  document.querySelectorAll(".app-only").forEach((el) => { el.style.display = currentUser ? "block" : "none"; });
  document.querySelectorAll(".admin-only").forEach((el) => { el.style.display = currentUser?.role === "admin" ? "block" : "none"; });
  currentUserView.textContent = currentUser ? `Logged in as ${currentUser.name} (${currentUser.email}, ${currentUser.role})` : "No user logged in.";
  renderExpenses();
  renderBudgetStatus();
  renderUsers();
}

function renderExpenses() {
  const userExpenses = getUserExpenses();
  const visibleExpenses = categoryFilter.value ? filterExpensesByCategory(userExpenses, categoryFilter.value) : userExpenses;
  expenseTableBody.innerHTML = visibleExpenses.map((expense) => `
    <tr>
      <td>${escapeHtml(expense.title)}</td>
      <td>${Number(expense.amount).toFixed(2)}</td>
      <td>${escapeHtml(expense.category)}</td>
      <td>${escapeHtml(expense.date)}</td>
      <td>
        <button data-edit="${expense.expenseId}">Edit</button>
        <button data-delete="${expense.expenseId}">Delete</button>
      </td>
    </tr>`).join("");
}

function renderBudgetStatus() {
  const userExpenses = getUserExpenses();
  if (!currentUser) { budgetStatus.textContent = "Login required."; return; }
  if (!budget) { budgetStatus.textContent = "No monthly budget set."; return; }
  if (userExpenses.length === 0) { budgetStatus.textContent = `Monthly budget set: ${budget.monthlyLimit.toFixed(2)}.`; return; }
  const latestMonth = getMonthKey(userExpenses[userExpenses.length - 1].date);
  const status = getBudgetStatus(userExpenses, budget, latestMonth);
  budgetStatus.textContent = `${status.message} Spent: ${status.spent.toFixed(2)}, Limit: ${status.limit.toFixed(2)}, Remaining: ${status.remaining.toFixed(2)}.`;
}

function renderUsers() {
  userTableBody.innerHTML = users.map((user) => `<tr><td>${escapeHtml(user.name)}</td><td>${escapeHtml(user.email)}</td><td>${escapeHtml(user.role)}</td></tr>`).join("");
}

function resetExpenseForm() {
  expenseForm.reset();
  expenseIdInput.value = "";
  submitExpenseBtn.textContent = "Add Expense";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("#registerName").value.trim();
  const email = $("#registerEmail").value.trim().toLowerCase();
  const password = $("#registerPassword").value;
  if (users.some((user) => user.email === email)) { $("#registerMessage").textContent = "Email already registered."; return; }
  users.push({ userId: users.length + 1, name, email, password, role: "user" });
  saveAll();
  registerForm.reset();
  $("#registerMessage").textContent = "Registration successful.";
  renderUsers();
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const authRepository = { findUserByEmail: async (email) => users.find((user) => user.email === email) || null };
  const result = await loginUser({ email: $("#loginEmail").value, password: $("#loginPassword").value }, authRepository);
  if (!result.success) { $("#loginMessage").textContent = result.errors.join(" "); return; }
  const fullUser = users.find((user) => user.email === result.user.email);
  currentUser = { userId: fullUser.userId, name: fullUser.name, email: fullUser.email, role: fullUser.role };
  saveAll();
  loginForm.reset();
  $("#loginMessage").textContent = "Login successful.";
  renderSession();
});

logoutBtn.addEventListener("click", () => {
  currentUser = null;
  saveAll();
  renderSession();
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!currentUser) { expenseMessage.textContent = "Login required."; return; }
  try {
    const userExpenses = getUserExpenses();
    const data = { title: titleInput.value, amount: amountInput.value, category: categoryInput.value, date: dateInput.value, ownerEmail: currentUser.email };
    if (expenseIdInput.value) {
      const updated = editExpense(userExpenses, Number(expenseIdInput.value), data).map((expense) => ({ ...expense, ownerEmail: currentUser.email }));
      replaceUserExpenses(updated);
      expenseMessage.textContent = "Expense updated successfully.";
    } else {
      const updated = addExpense(userExpenses, data).map((expense) => ({ ...expense, ownerEmail: currentUser.email }));
      replaceUserExpenses(updated);
      expenseMessage.textContent = "Expense added successfully.";
    }
    saveAll();
    resetExpenseForm();
    renderExpenses();
    renderBudgetStatus();
  } catch (error) { expenseMessage.textContent = error.message; }
});

expenseTableBody.addEventListener("click", (event) => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;
  const userExpenses = getUserExpenses();
  if (editId) {
    const expense = userExpenses.find((item) => item.expenseId === Number(editId));
    expenseIdInput.value = expense.expenseId;
    titleInput.value = expense.title;
    amountInput.value = expense.amount;
    categoryInput.value = expense.category;
    dateInput.value = expense.date;
    submitExpenseBtn.textContent = "Update Expense";
  }
  if (deleteId) {
    try {
      replaceUserExpenses(deleteExpense(userExpenses, Number(deleteId)));
      saveAll();
      renderExpenses();
      renderBudgetStatus();
      expenseMessage.textContent = "Expense deleted successfully.";
    } catch (error) { expenseMessage.textContent = error.message; }
  }
});

cancelEditBtn.addEventListener("click", resetExpenseForm);
categoryFilter.addEventListener("change", renderExpenses);
setBudgetBtn.addEventListener("click", () => {
  try { budget = setMonthlyBudget(budgetLimitInput.value); saveAll(); renderBudgetStatus(); }
  catch (error) { budgetStatus.textContent = error.message; }
});

$("#generateReportBtn").addEventListener("click", () => {
  const month = reportMonth.value || getMonthKey(new Date().toISOString());
  reportOutput.textContent = JSON.stringify(generateMonthlyReport(getUserExpenses(), month), null, 2);
});

$("#analyzeTrendBtn").addEventListener("click", () => {
  const totals = Object.entries(getUserExpenses().reduce((acc, expense) => {
    const month = getMonthKey(expense.date);
    acc[month] = (acc[month] || 0) + Number(expense.amount || 0);
    return acc;
  }, {})).sort(([a], [b]) => a.localeCompare(b)).map(([month, total]) => ({ month, total }));
  reportOutput.textContent = JSON.stringify(analyzeSpendingTrend(totals), null, 2);
});

renderSession();

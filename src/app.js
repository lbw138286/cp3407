const $ = (selector) => document.querySelector(selector);
let token = sessionStorage.getItem("sessionToken") || "";
let currentUser = null;
let expenseCache = [];

const moneyFormatter = new Intl.NumberFormat("en-SG", {
  style: "currency",
  currency: "SGD",
  minimumFractionDigits: 2
});

function msg(element, text, isError = false) {
  element.textContent = text;
  element.classList.toggle("error", isError);
}

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(path, { ...options, headers });
  let data = {};
  try { data = await response.json(); } catch {}
  if (!response.ok) {
    throw new Error(data.errors?.join(" ") || data.message || `Request failed (${response.status}).`);
  }
  return data;
}

function esc(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function nowMonth() {
  return new Date().toISOString().slice(0, 7);
}

function formatMoney(value) {
  const amount = Number(value);
  return moneyFormatter.format(Number.isFinite(amount) ? amount : 0);
}

function formatMonth(month) {
  if (!/^\d{4}-\d{2}$/.test(String(month || ""))) return String(month || "—");
  const date = new Date(`${month}-01T00:00:00`);
  return new Intl.DateTimeFormat("en-SG", { month: "long", year: "numeric" }).format(date);
}

function hideReportPanels() {
  $("#monthlyReportPanel").hidden = true;
  $("#trendPanel").hidden = true;
}

function showReportError(error) {
  hideReportPanels();
  $("#reportEmpty").hidden = false;
  $("#technicalDetails").hidden = true;
  msg($("#reportMessage"), error.message, true);
}

function showTechnicalDetails(data) {
  $("#reportOutput").textContent = JSON.stringify(data, null, 2);
  $("#technicalDetails").hidden = false;
}

function renderMonthlyReport(report, responseData) {
  hideReportPanels();
  $("#reportEmpty").hidden = true;
  $("#monthlyReportPanel").hidden = false;
  msg($("#reportMessage"), `Monthly report generated for ${formatMonth(report.month)}.`);

  $("#summaryMonth").textContent = formatMonth(report.month);
  $("#summaryTotal").textContent = formatMoney(report.totalSpent);
  $("#summaryCount").textContent = String(report.expenseCount);
  $("#summaryTopCategory").textContent = report.topCategory || "No spending yet";

  const categoryEntries = Object.entries(report.categoryTotals || {})
    .map(([category, amount]) => [category, Number(amount) || 0])
    .sort((a, b) => b[1] - a[1]);
  const categoryMaximum = Math.max(1, ...categoryEntries.map(([, amount]) => amount));
  const totalSpent = Number(report.totalSpent) || 0;

  $("#categoryBreakdown").innerHTML = categoryEntries.length
    ? categoryEntries.map(([category, amount]) => {
        const percentage = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
        return `<div class="bar-row">
          <div class="bar-label"><span>${esc(category)}</span><strong>${formatMoney(amount)}</strong></div>
          <progress max="${categoryMaximum}" value="${amount}" aria-label="${esc(category)} spending"></progress>
          <span class="bar-caption">${percentage.toFixed(1)}% of monthly spending</span>
        </div>`;
      }).join("")
    : '<p class="empty-note">No category spending was recorded for this month.</p>';

  const expenses = Array.isArray(report.expenses) ? report.expenses : [];
  $("#monthlyExpenseBody").innerHTML = expenses.length
    ? expenses.map((expense) => `<tr>
        <td>${esc(expense.date)}</td>
        <td>${esc(expense.title)}</td>
        <td>${esc(expense.category)}</td>
        <td>${formatMoney(expense.amount)}</td>
      </tr>`).join("")
    : '<tr><td colspan="4">No expense records for this month.</td></tr>';

  showTechnicalDetails(responseData);
}

function renderSpendingTrend(data) {
  hideReportPanels();
  $("#reportEmpty").hidden = true;
  $("#trendPanel").hidden = false;
  msg($("#reportMessage"), "Spending trend analysis generated.");

  const totals = Array.isArray(data.monthlyTotals)
    ? [...data.monthlyTotals].sort((a, b) => String(a.month).localeCompare(String(b.month)))
    : [];
  const trend = data.trend || { direction: "not_enough_data", change: 0, message: "No trend data is available." };
  const labels = {
    increasing: "Increasing",
    decreasing: "Decreasing",
    stable: "Stable",
    not_enough_data: "More data needed"
  };
  const direction = Object.hasOwn(labels, trend.direction) ? trend.direction : "not_enough_data";
  const first = totals[0];
  const latest = totals[totals.length - 1];
  const change = Number(trend.change) || 0;

  $("#trendDirection").textContent = labels[direction];
  $("#trendDirection").className = `trend-badge ${direction}`;
  $("#trendChange").textContent = `${change > 0 ? "+" : ""}${formatMoney(change)}`;
  $("#trendPeriod").textContent = first && latest
    ? `${formatMonth(first.month)} – ${formatMonth(latest.month)}`
    : "Insufficient data";
  $("#trendLatest").textContent = latest
    ? `${formatMonth(latest.month)}: ${formatMoney(latest.total)}`
    : "No monthly totals";
  $("#trendMessage").textContent = trend.message || "";

  const maximum = Math.max(1, ...totals.map((item) => Number(item.total) || 0));
  $("#trendBars").innerHTML = totals.length
    ? totals.map((item) => `<div class="bar-row">
        <div class="bar-label"><span>${esc(formatMonth(item.month))}</span><strong>${formatMoney(item.total)}</strong></div>
        <progress max="${maximum}" value="${Number(item.total) || 0}" aria-label="${esc(formatMonth(item.month))} spending"></progress>
      </div>`).join("")
    : '<p class="empty-note">Add expenses in at least two different months to compare spending trends.</p>';

  showTechnicalDetails(data);
}

async function init() {
  try {
    const health = await api("/api/health");
    $("#healthStatus").textContent = `Server: ${health.status} | ${health.database}`;
  } catch {
    $("#healthStatus").textContent = "Server unavailable";
  }
  $("#budgetMonth").value = nowMonth();
  $("#reportMonth").value = nowMonth();
  if (token) {
    try { currentUser = (await api("/api/auth/me")).user; }
    catch { token = ""; sessionStorage.removeItem("sessionToken"); }
  }
  await renderSession();
}

async function renderSession() {
  document.querySelectorAll(".app-only").forEach((element) => {
    element.style.display = currentUser ? "block" : "none";
  });
  document.querySelectorAll(".admin-only").forEach((element) => {
    element.style.display = currentUser?.role === "admin" ? "block" : "none";
  });
  $("#currentUser").textContent = currentUser
    ? `Logged in as ${currentUser.name} (${currentUser.email}, ${currentUser.role})`
    : "No user logged in.";
  if (currentUser) {
    await loadExpenses();
    await loadBudgetStatus();
    if (currentUser.role === "admin") await loadUsers();
  }
}

async function loadExpenses() {
  const category = $("#categoryFilter").value;
  expenseCache = (await api(`/api/expenses${category ? `?category=${encodeURIComponent(category)}` : ""}`)).expenses;
  $("#expenseTableBody").innerHTML = expenseCache.map((expense) => `<tr>
    <td>${esc(expense.title)}</td><td>${expense.amount.toFixed(2)}</td><td>${esc(expense.category)}</td><td>${esc(expense.date)}</td>
    <td><button class="small" data-edit="${expense.expenseId}">Edit</button> <button class="small danger" data-delete="${expense.expenseId}">Delete</button></td>
  </tr>`).join("") || '<tr><td colspan="5">No expense records.</td></tr>';
}

async function loadBudgetStatus() {
  const month = $("#budgetMonth").value || nowMonth();
  try {
    const status = (await api(`/api/budget/status?month=${month}`)).status;
    msg($("#budgetStatus"), `${status.message} Spent ${status.spent.toFixed(2)} / ${status.limit.toFixed(2)}; remaining ${status.remaining.toFixed(2)}.`);
  } catch (error) {
    msg($("#budgetStatus"), error.message, true);
  }
}

async function loadUsers() {
  const users = (await api("/api/admin/users")).users;
  $("#userTableBody").innerHTML = users.map((user) => `<tr data-user="${user.userId}">
    <td>${esc(user.name)}</td><td>${esc(user.email)}</td>
    <td><select data-role><option ${user.role === "user" ? "selected" : ""}>user</option><option ${user.role === "admin" ? "selected" : ""}>admin</option></select></td>
    <td><select data-status><option ${user.status === "active" ? "selected" : ""}>active</option><option ${user.status === "disabled" ? "selected" : ""}>disabled</option></select></td>
    <td>${user.userId === currentUser.userId ? "Current account" : '<button class="small" data-save-user>Save</button> <button class="small danger" data-delete-user>Delete</button>'}</td>
  </tr>`).join("");
}

$("#registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await api("/api/auth/register", { method: "POST", body: JSON.stringify({
      name: $("#registerName").value,
      email: $("#registerEmail").value,
      password: $("#registerPassword").value
    }) });
    event.target.reset();
    msg($("#registerMessage"), "Registration successful. You can now log in.");
  } catch (error) { msg($("#registerMessage"), error.message, true); }
});

$("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const result = await api("/api/auth/login", { method: "POST", body: JSON.stringify({
      email: $("#loginEmail").value,
      password: $("#loginPassword").value
    }) });
    token = result.token;
    sessionStorage.setItem("sessionToken", token);
    currentUser = result.user;
    event.target.reset();
    msg($("#loginMessage"), "Login successful.");
    await renderSession();
  } catch (error) { msg($("#loginMessage"), error.message, true); }
});

$("#logoutBtn").addEventListener("click", async () => {
  try { if (token) await api("/api/auth/logout", { method: "POST" }); } catch {}
  token = "";
  currentUser = null;
  sessionStorage.removeItem("sessionToken");
  await renderSession();
});

function resetExpense() {
  $("#expenseForm").reset();
  $("#expenseId").value = "";
  $("#submitExpenseBtn").textContent = "Add Expense";
}

$("#expenseForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = $("#expenseId").value;
  const payload = { title: $("#title").value, amount: $("#amount").value, category: $("#category").value, date: $("#date").value };
  try {
    await api(id ? `/api/expenses/${id}` : "/api/expenses", { method: id ? "PUT" : "POST", body: JSON.stringify(payload) });
    msg($("#expenseMessage"), id ? "Expense updated successfully." : "Expense added successfully.");
    resetExpense();
    await loadExpenses();
    await loadBudgetStatus();
  } catch (error) { msg($("#expenseMessage"), error.message, true); }
});

$("#cancelEditBtn").addEventListener("click", resetExpense);

$("#expenseTableBody").addEventListener("click", async (event) => {
  const edit = event.target.dataset.edit;
  const remove = event.target.dataset.delete;
  if (edit) {
    const expense = expenseCache.find((value) => value.expenseId === Number(edit));
    $("#expenseId").value = expense.expenseId;
    $("#title").value = expense.title;
    $("#amount").value = expense.amount;
    $("#category").value = expense.category;
    $("#date").value = expense.date;
    $("#submitExpenseBtn").textContent = "Update Expense";
  }
  if (remove && confirm("Delete this expense?")) {
    try {
      await api(`/api/expenses/${remove}`, { method: "DELETE" });
      await loadExpenses();
      await loadBudgetStatus();
      msg($("#expenseMessage"), "Expense deleted successfully.");
    } catch (error) { msg($("#expenseMessage"), error.message, true); }
  }
});

$("#categoryFilter").addEventListener("change", loadExpenses);
$("#budgetMonth").addEventListener("change", loadBudgetStatus);

$("#setBudgetBtn").addEventListener("click", async () => {
  try {
    await api("/api/budget", { method: "PUT", body: JSON.stringify({ month: $("#budgetMonth").value, limit: $("#budgetLimit").value }) });
    await loadBudgetStatus();
  } catch (error) { msg($("#budgetStatus"), error.message, true); }
});

$("#generateReportBtn").addEventListener("click", async () => {
  try {
    const month = $("#reportMonth").value;
    if (!month) throw new Error("Select a valid report month.");
    const data = await api(`/api/reports/monthly?month=${month}`);
    renderMonthlyReport(data.report, data);
  } catch (error) { showReportError(error); }
});

$("#analyzeTrendBtn").addEventListener("click", async () => {
  try {
    const data = await api("/api/reports/trend");
    renderSpendingTrend(data);
  } catch (error) { showReportError(error); }
});

$("#refreshUsersBtn").addEventListener("click", loadUsers);

$("#userTableBody").addEventListener("click", async (event) => {
  const row = event.target.closest("tr[data-user]");
  if (!row) return;
  const id = row.dataset.user;
  try {
    if (event.target.hasAttribute("data-save-user")) {
      await api(`/api/admin/users/${id}`, { method: "PATCH", body: JSON.stringify({
        role: row.querySelector("[data-role]").value,
        status: row.querySelector("[data-status]").value
      }) });
      msg($("#adminMessage"), "User account updated.");
      await loadUsers();
    }
    if (event.target.hasAttribute("data-delete-user") && confirm("Permanently delete this user and their data?")) {
      await api(`/api/admin/users/${id}`, { method: "DELETE" });
      msg($("#adminMessage"), "User account deleted.");
      await loadUsers();
    }
  } catch (error) { msg($("#adminMessage"), error.message, true); }
});

$("#feedbackForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await api("/api/feedback", { method: "POST", body: JSON.stringify({
      iteration: Number($("#feedbackIteration").value),
      reviewer: $("#feedbackReviewer").value,
      outcome: $("#feedbackOutcome").value,
      comments: $("#feedbackComments").value
    }) });
    event.target.reset();
    msg($("#feedbackMessage"), "Acceptance feedback saved to the database.");
  } catch (error) { msg($("#feedbackMessage"), error.message, true); }
});

init();

const STORAGE_KEY = "smart-expense-tracker-expenses";

const form = document.querySelector("#expense-form");
const editIdInput = document.querySelector("#edit-id");
const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const tableBody = document.querySelector("#expense-table-body");
const emptyMessage = document.querySelector("#empty-message");
const formTitle = document.querySelector("#form-title");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");

let expenses = loadExpenses();
renderExpenses();

form.addEventListener("submit", handleSubmit);
cancelEditButton.addEventListener("click", resetForm);

function loadExpenses() {
  const savedExpenses = localStorage.getItem(STORAGE_KEY);
  return savedExpenses ? JSON.parse(savedExpenses) : [];
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function handleSubmit(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;
  const editId = editIdInput.value;

  if (!title || amount <= 0 || !category || !date) {
    alert("Please enter a valid title, amount, category, and date.");
    return;
  }

  if (editId) {
    updateExpense(editId, title, amount, category, date);
  } else {
    addExpense(title, amount, category, date);
  }

  saveExpenses();
  renderExpenses();
  resetForm();
}

function addExpense(title, amount, category, date) {
  const newExpense = {
    id: crypto.randomUUID(),
    title,
    amount,
    category,
    date
  };

  expenses.push(newExpense);
}

function updateExpense(id, title, amount, category, date) {
  expenses = expenses.map((expense) => {
    if (expense.id === id) {
      return { ...expense, title, amount, category, date };
    }
    return expense;
  });
}

function editExpense(id) {
  const expense = expenses.find((item) => item.id === id);
  if (!expense) return;

  editIdInput.value = expense.id;
  titleInput.value = expense.title;
  amountInput.value = expense.amount;
  categoryInput.value = expense.category;
  dateInput.value = expense.date;

  formTitle.textContent = "Edit Expense";
  submitButton.textContent = "Update Expense";
  cancelEditButton.classList.remove("hidden");
}

function deleteExpense(id) {
  const confirmed = confirm("Are you sure you want to delete this expense?");
  if (!confirmed) return;

  expenses = expenses.filter((expense) => expense.id !== id);
  saveExpenses();
  renderExpenses();
  resetForm();
}

function renderExpenses() {
  tableBody.innerHTML = "";
  emptyMessage.classList.toggle("hidden", expenses.length > 0);

  expenses.forEach((expense) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${escapeHtml(expense.title)}</td>
      <td>$${Number(expense.amount).toFixed(2)}</td>
      <td>${escapeHtml(expense.category)}</td>
      <td>${escapeHtml(expense.date)}</td>
      <td>
        <button class="small" onclick="editExpense('${expense.id}')">Edit</button>
        <button class="small danger" onclick="deleteExpense('${expense.id}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function resetForm() {
  form.reset();
  editIdInput.value = "";
  formTitle.textContent = "Add New Expense";
  submitButton.textContent = "Add Expense";
  cancelEditButton.classList.add("hidden");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

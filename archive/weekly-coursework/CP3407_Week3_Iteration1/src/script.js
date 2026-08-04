const form = document.getElementById("expenseForm");
const tableBody = document.getElementById("expenseTableBody");
const message = document.getElementById("message");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
    tableBody.innerHTML = "";

    expenses.forEach((expense) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>$${Number(expense.amount).toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
        `;

        tableBody.appendChild(row);
    });
}

function isValidExpense(title, amount, category, date) {
    return title.trim() !== "" && Number(amount) > 0 && category !== "" && date !== "";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (!isValidExpense(title, amount, category, date)) {
        message.textContent = "Please enter a valid expense record.";
        message.style.color = "#b00020";
        return;
    }

    const newExpense = {
        title: title.trim(),
        amount: Number(amount),
        category,
        date
    };

    expenses.push(newExpense);
    saveExpenses();
    renderExpenses();

    form.reset();
    message.textContent = "Expense added successfully.";
    message.style.color = "#0a7a2f";
});

renderExpenses();

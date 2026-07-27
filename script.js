// Store all expenses
let expenses = [];
let budget = 0;


// Get HTML elements

const amountInput = document.getElementById("amount");
const reasonInput = document.getElementById("reason");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const budgetInput = document.getElementById("budget");
const setBudgetBtn = document.getElementById("setBudgetBtn");

const addExpenseBtn = document.getElementById("addExpenseBtn");

const expenseTableBody = document.getElementById("expenseTableBody");

const spentDisplay = document.getElementById("spentDisplay");
const budgetDisplay = document.getElementById("budgetDisplay");
const remainingDisplay = document.getElementById("remainingDisplay");



// Add Expense Button
addExpenseBtn.addEventListener("click", addExpense);

setBudgetBtn.addEventListener("click", function(){

    budget = Number(budgetInput.value);

    if(budget <= 0){
        alert("Enter a valid budget");
        return;
    }

    budgetDisplay.textContent = budget;

    calculateSpent();

    budgetInput.value = "";

});


// Function to add expense
function addExpense() {

    const amount = Number(amountInput.value);
    const reason = reasonInput.value.trim();
    const category = categoryInput.value;
    const date = dateInput.value;

    // Validation
    if (
        amount <= 0 ||
        reason === "" ||
        category === "" ||
        date === ""
    ) {
        alert("Please fill all fields correctly.");
        return;
    }

    // Expense Object
    const expense = {
        id: Date.now(),
        amount: amount,
        reason: reason,
        category: category,
        date: date
    };

    expenses.push(expense);

    displayExpenses();
    calculateSpent();

    clearInputs();
}

// Display all expenses
function displayExpenses() {

    expenseTableBody.innerHTML = "";

    expenses.forEach(function(expense) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>₹${expense.amount}</td>
            <td>${expense.reason}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        `;

        expenseTableBody.appendChild(row);

    });

}

// Delete expense
function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    displayExpenses();
    calculateSpent();

}

function calculateSpent() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    spentDisplay.textContent = total;

    let remaining = budget - total;

    remainingDisplay.textContent = remaining;
}

// Clear input fields
function clearInputs() {

    amountInput.value = "";
    reasonInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";

}




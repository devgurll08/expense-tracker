let myChart = null;
let expenses = JSON.parse(localStorage.getItem("expenses")) ||[];

const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const categoryInput = document.getElementById("expenseCategory");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const newExpense = {
    id: Date.now(),
    name: nameInput.value,
    amount: parseFloat(amountInput.value),
    category: categoryInput.value
  };

  expenses.push(newExpense);
  
  form.reset();
  renderExpenses();
});
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach(function(expense) {
    const li = document.createElement("li");
    li.innerHTML = expense.name + " - ₹" + expense.amount + " (" + expense.category + ") " +
      "<button onclick='deleteExpense(" + expense.id + ")'>Delete</button>";
    expenseList.appendChild(li);
  });

  let total = 0;
  expenses.forEach(function(expense) {
    total = total + expense.amount;
  });
  totalAmount.textContent = total;
}

function deleteExpense(id) {
  expenses = expenses.filter(function(expense) {
    return expense.id !== id;
  });
  renderExpenses();
}

function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach(function(expense) {
    const li = document.createElement("li");
    li.innerHTML = expense.name + " - ₹" + expense.amount + " (" + expense.category + ") " +
      "<button onclick='deleteExpense(" + expense.id + ")'>Delete</button>";
    expenseList.appendChild(li);
  });

  let total = 0;
  expenses.forEach(function(expense) {
    total = total + expense.amount;
  });
  totalAmount.textContent = total;

  localStorage.setItem("expenses", JSON.stringify(expenses));
}
renderExpenses();

function renderChart() {
  const categoryTotals = {};

  expenses.forEach(function(expense) {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] = categoryTotals[expense.category] + expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  if (myChart !== null) {
    myChart.destroy();
  }

  const ctx = document.getElementById("expenseChart");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ["#38BDF8", "#F472B6", "#FACC15", "#4ADE80", "#A78BFA"]
      }]
    },
    options: {
        responsive : true,
        maintainAspectRatio: true
    }
  });
}
renderChart();
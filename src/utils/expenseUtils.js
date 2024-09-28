export function calculateTotalExpenses(expenses) {
  return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
}

export function calculateTotalPayments(payments) {
  return payments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
}

export function calculateBalances(expenses = [], payments = []) {
  const balances = {};

  // Initialize balances for all people involved
  const allPeople = new Set();
  expenses.forEach(expense => {
    allPeople.add(expense.paidBy);
    expense.paidFor.forEach(person => allPeople.add(person));
  });
  payments.forEach(payment => {
    allPeople.add(payment.from);
    allPeople.add(payment.to);
  });
  allPeople.forEach(person => {
    balances[person] = 0;
  });

  // Calculate balances from expenses
  expenses.forEach(expense => {
    const { paidBy, amount, paidFor } = expense;
    const splitAmount = amount / paidFor.length;
    balances[paidBy] += amount;
    paidFor.forEach(person => {
      balances[person] -= splitAmount;
    });
  });

  // Adjust balances based on payments
  payments.forEach(payment => {
    const { from, to, amount } = payment;
    balances[from] -= amount;
    balances[to] += amount;
  });

  return balances;
}

export function saveData(data) {
  localStorage.setItem('expenseTrackerData', JSON.stringify(data));
}

export function loadData() {
  const data = localStorage.getItem('expenseTrackerData');
  return data ? JSON.parse(data) : { expenses: [], payments: [] };
}
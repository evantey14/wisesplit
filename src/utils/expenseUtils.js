export function calculateTotalExpenses(expenses) {
  return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
}

export function calculateTotalPayments(payments) {
  return payments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
}

export function calculateBalances(expenses = [], payments = []) {
  const balances = {};

  // Process expenses
  expenses.forEach(expense => {
    const { paidBy, amount, splitBetween } = expense;
    if (!paidBy || !amount || !splitBetween || !Array.isArray(splitBetween)) return;
    
    const splitAmount = amount / splitBetween.length;

    splitBetween.forEach(person => {
      if (person !== paidBy) {
        balances[person] = balances[person] || {};
        balances[person][paidBy] = (balances[person][paidBy] || 0) + splitAmount;
        balances[paidBy] = balances[paidBy] || {};
        balances[paidBy][person] = (balances[paidBy][person] || 0) - splitAmount;
      }
    });
  });

  // Process payments
  payments.forEach(payment => {
    const { from, to, amount } = payment;
    if (!from || !to || !amount) return;
    
    balances[from] = balances[from] || {};
    balances[from][to] = (balances[from][to] || 0) - amount;
    balances[to] = balances[to] || {};
    balances[to][from] = (balances[to][from] || 0) + amount;
  });

  // Simplify balances
  Object.keys(balances).forEach(person1 => {
    Object.keys(balances[person1]).forEach(person2 => {
      if (balances[person2] && balances[person2][person1]) {
        if (balances[person1][person2] > balances[person2][person1]) {
          balances[person1][person2] -= balances[person2][person1];
          delete balances[person2][person1];
        } else {
          balances[person2][person1] -= balances[person1][person2];
          delete balances[person1][person2];
        }
      }
    });
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
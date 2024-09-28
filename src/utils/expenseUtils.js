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
    const { paidBy, amount, paidFor } = expense;
    if (!paidBy || !amount || !paidFor || !Array.isArray(paidFor)) return;
    
    const splitAmount = amount / paidFor.length;

    paidFor.forEach(person => {
      if (person !== paidBy) {
        balances[person] = balances[person] || {};
        balances[person][paidBy] = (balances[person][paidBy] || 0) + splitAmount;
        balances[paidBy] = balances[paidBy] || {};
        balances[paidBy][person] = (balances[paidBy][person] || 0) - splitAmount;
      }
    });
  });

  console.log('Balances after processing expenses:', JSON.stringify(balances, null, 2));

  // Process payments
  payments.forEach(payment => {
    const { from, to, amount } = payment;
    if (!from || !to || !amount) return;

    balances[from] = balances[from] || {};
    balances[from][to] = (balances[from][to] || 0) - amount;
    balances[to] = balances[to] || {};
    balances[to][from] = (balances[to][from] || 0) + amount;
  });

  console.log('Balances after processing payments:', JSON.stringify(balances, null, 2));

  // Calculate net balances
  const netBalances = {};
  Object.keys(balances).forEach(person1 => {
    Object.keys(balances[person1]).forEach(person2 => {
      const amount = balances[person1][person2];
      if (amount !== 0) {
        netBalances[person1] = netBalances[person1] || {};
        netBalances[person1][person2] = amount;
      }
    });
  });

  console.log('Net balances:', JSON.stringify(netBalances, null, 2));

  return netBalances;
}

export function saveData(data) {
  localStorage.setItem('expenseTrackerData', JSON.stringify(data));
}

export function loadData() {
  const data = localStorage.getItem('expenseTrackerData');
  return data ? JSON.parse(data) : { expenses: [], payments: [] };
}
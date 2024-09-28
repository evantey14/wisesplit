export function calculateBalances(expenses, payments) {
  const balances = {};

  // Calculate balances from expenses
  expenses.forEach(expense => {
    const { amount, paidBy, participants } = expense;
    const share = amount / participants.length;

    participants.forEach(participant => {
      balances[participant] = (balances[participant] || 0) - share;
    });

    balances[paidBy] = (balances[paidBy] || 0) + amount;
  });

  // Adjust balances based on payments
  payments.forEach(payment => {
    const { payer, recipient, amount } = payment;
    balances[payer] = (balances[payer] || 0) - amount;
    balances[recipient] = (balances[recipient] || 0) + amount;
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
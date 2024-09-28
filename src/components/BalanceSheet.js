import React from 'react';
import { calculateTotalExpenses, calculateBalances } from '../utils/expenseUtils';

function BalanceSheet({ expenses, payments }) {
  // Check if expenses and payments are arrays and have length
  const validExpenses = Array.isArray(expenses) && expenses.length > 0;
  const validPayments = Array.isArray(payments) && payments.length > 0;

  const totalExpenses = validExpenses ? calculateTotalExpenses(expenses) : 0;
  const balances = (validExpenses || validPayments) ? calculateBalances(expenses || [], payments || []) : {};

  return (
    <div className="balance-sheet">
      <h2>Balance Sheet</h2>
      <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      
      <h3>Balances:</h3>
      {Object.keys(balances).length > 0 ? (
        Object.entries(balances).map(([person, owes]) => (
          <div key={person}>
            <h4>{person}</h4>
            {Object.entries(owes).map(([owedTo, amount]) => (
              <p key={`${person}-${owedTo}`}>
                {amount > 0
                  ? `Owes ${owedTo}: $${amount.toFixed(2)}`
                  : `Is owed by ${owedTo}: $${(-amount).toFixed(2)}`}
              </p>
            ))}
          </div>
        ))
      ) : (
        <p>No balances to display.</p>
      )}
    </div>
  );
}

export default BalanceSheet;
import React from 'react';
import { calculateBalances } from '../utils/expenseUtils';

function BalanceSheet({ expenses, payments }) {
  const balances = calculateBalances(expenses, payments);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Balances</h3>
      {Object.keys(balances).length > 0 ? (
        <ul>
          {Object.entries(balances).map(([person, balance]) => (
            <li key={person} className="mb-1">
              {person}: ${balance.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No balance information available.</p>
      )}
    </div>
  );
}

export default BalanceSheet;
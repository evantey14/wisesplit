import React from 'react';
import { calculateBalances } from '../utils/expenseUtils';

function BalanceSheet({ expenses, payments }) {
  const balances = calculateBalances(expenses, payments);

  return (
    <div className="balance-sheet">
      {Object.keys(balances).length === 0 ? (
        <p className="text-gray-500 italic">No balances to display.</p>
      ) : (
        <ul className="list-none">
          {Object.entries(balances).map(([person, owes]) => (
            <li key={person} className="mb-2">
              <strong>{person}:</strong>
              <ul className="list-disc ml-6">
                {Object.entries(owes).map(([otherPerson, amount]) => (
                  <li key={`${person}-${otherPerson}`}>
                    {amount > 0 
                      ? `Owes ${otherPerson}: $${amount.toFixed(2)}`
                      : `Is owed by ${otherPerson}: $${(-amount).toFixed(2)}`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BalanceSheet;
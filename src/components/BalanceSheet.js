import React from 'react';
import { calculateBalances, simplifyBalances } from '../utils/expenseUtils';

function BalanceSheet({ expenses, payments }) {
  const balances = simplifyBalances(calculateBalances(expenses, payments));

  return (
    <div className="balance-sheet bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Balance Sheet</h2>
      {Object.keys(balances).length === 0 ? (
        <p className="text-gray-500 italic">No balances to display.</p>
      ) : (
        <div className="space-y-4">
          {Object.entries(balances).map(([person, owes]) => (
            <div key={person} className="bg-gray-50 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">{person}</h3>
              <ul className="space-y-1">
                {Object.entries(owes).map(([otherPerson, amount]) => (
                  <li key={`${person}-${otherPerson}`} className="flex justify-between items-center">
                    <span>
                      {amount > 0 ? (
                        <span className="text-red-600">Owes {otherPerson}</span>
                      ) : (
                        <span className="text-green-600">Is owed by {otherPerson}</span>
                      )}
                    </span>
                    <span className={`font-medium ${amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ${Math.abs(amount).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BalanceSheet;
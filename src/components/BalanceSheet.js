import React from 'react';

function BalanceSheet({ balances }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Balance Sheet</h2>
      <ul className="divide-y divide-gray-200">
        {Object.entries(balances).map(([person, amount]) => (
          <li key={person} className="py-4 flex justify-between">
            <span className="text-gray-900">{person}</span>
            <span className={`font-medium ${amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {amount >= 0 ? `$${amount.toFixed(2)} (to receive)` : `$${Math.abs(amount).toFixed(2)} (to pay)`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BalanceSheet;
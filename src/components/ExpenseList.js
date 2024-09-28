import React from 'react';

function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Expense History</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Paid By</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2">{expense.date.toLocaleDateString()}</td>
              <td className="px-4 py-2">{expense.description}</td>
              <td className="px-4 py-2 capitalize">{expense.paidBy}</td>
              <td className="px-4 py-2">${expense.amount.toFixed(2)}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onDeleteExpense(expense)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
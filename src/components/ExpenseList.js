import React from 'react';
import { isValid } from 'date-fns';

function ExpenseList({ expenses }) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Date</th>
          <th className="px-4 py-2 border">Description</th>
          <th className="px-4 py-2 border">Paid By</th>
          <th className="px-4 py-2 border">Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border">
              {isValid(new Date(expense.date)) 
                ? new Date(expense.date).toLocaleDateString() 
                : 'Invalid Date'}
            </td>
            <td className="px-4 py-2 border">{expense.description}</td>
            <td className="px-4 py-2 border">{expense.paidBy}</td>
            <td className="px-4 py-2 border">${expense.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;
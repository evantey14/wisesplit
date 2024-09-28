import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div>
      <h2>Expenses</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Paid By</th>
            <th>Participants</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>{expense.paidBy}</td>
              <td>{expense.participants.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
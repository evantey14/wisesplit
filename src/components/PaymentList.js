import React from 'react';

function PaymentList({ payments, onDeletePayment }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">From</th>
            <th className="px-4 py-2 text-left">To</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2">{payment.date.toLocaleDateString()}</td>
              <td className="px-4 py-2 capitalize">{payment.from}</td>
              <td className="px-4 py-2 capitalize">{payment.to}</td>
              <td className="px-4 py-2">${payment.amount.toFixed(2)}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onDeletePayment(payment)}
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

export default PaymentList;
import React from 'react';
import { format } from 'date-fns';

function PaymentList({ payments }) {
  return (
    <div className="payment-list">
      {payments.length === 0 ? (
        <p className="text-gray-500 italic">No payments recorded yet.</p>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left font-semibold">Date</th>
              <th className="text-left font-semibold">From</th>
              <th className="text-left font-semibold">To</th>
              <th className="text-left font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{format(new Date(payment.date), 'M/d/yyyy')}</td>
                <td>{payment.from}</td>
                <td>{payment.to}</td>
                <td>${parseFloat(payment.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PaymentList;
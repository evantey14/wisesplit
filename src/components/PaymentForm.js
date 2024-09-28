import React, { useState } from 'react';

function PaymentForm({ onAddPayment }) {
  const [payment, setPayment] = useState({
    from: '',
    to: '',
    amount: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPayment({
      ...payment,
      amount: parseFloat(payment.amount),
      date: new Date(payment.date),
    });
    setPayment({ from: '', to: '', amount: '', date: '' });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Record Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from">
            From
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="from"
            name="from"
            value={payment.from}
            onChange={handleChange}
            required
          >
            <option value="">Select person</option>
            <option value="evan">Evan</option>
            <option value="neil">Neil</option>
            <option value="sab">Sab</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
            To
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="to"
            name="to"
            value={payment.to}
            onChange={handleChange}
            required
          >
            <option value="">Select person</option>
            <option value="evan">Evan</option>
            <option value="neil">Neil</option>
            <option value="sab">Sab</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            placeholder="Amount"
            name="amount"
            value={payment.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            name="date"
            value={payment.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Record Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
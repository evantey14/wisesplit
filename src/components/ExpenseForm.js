import React, { useState } from 'react';

const people = ['evan', 'neil', 'sab'];

function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('evan');
  const [paidFor, setPaidFor] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount && paidBy && date && paidFor.length > 0) {
      onAddExpense({
        description,
        amount: parseFloat(amount),
        paidBy,
        paidFor,
        date: new Date(date),
      });
      setDescription('');
      setAmount('');
      setPaidBy('evan');
      setPaidFor([]);
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  const handlePaidForChange = (person) => {
    setPaidFor(prev => 
      prev.includes(person) 
        ? prev.filter(p => p !== person)
        : [...prev, person]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paidBy">
          Paid By
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="paidBy"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          {people.map(person => (
            <option key={person} value={person}>{person}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Paid For
        </label>
        <div className="flex flex-wrap gap-2">
          {people.map(person => (
            <label key={person} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={paidFor.includes(person)}
                onChange={() => handlePaidForChange(person)}
              />
              <span className="ml-2">{person}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
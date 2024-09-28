import React, { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState(['evan', 'neil', 'sab']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      paidBy,
      participants,
      date: new Date().toISOString()
    };
    onAddExpense(expense);
    setDescription('');
    setAmount('');
    setPaidBy('');
    setParticipants(['evan', 'neil', 'sab']);
  };

  const handleParticipantToggle = (participant) => {
    setParticipants(prevParticipants => 
      prevParticipants.includes(participant)
        ? prevParticipants.filter(p => p !== participant)
        : [...prevParticipants, participant]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Expense</h2>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Paid by"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <span className="block text-gray-700 text-sm font-bold mb-2">Participants:</span>
        <div className="flex space-x-2">
          {['evan', 'neil', 'sab'].map(participant => (
            <button
              key={participant}
              type="button"
              onClick={() => handleParticipantToggle(participant)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                participants.includes(participant)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {participant}
            </button>
          ))}
        </div>
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
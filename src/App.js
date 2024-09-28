import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BalanceSheet from './components/BalanceSheet';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({ evan: 0, neil: 0, sab: 0 });

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    // Update balances logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ExpenseForm onAddExpense={handleAddExpense} />
        <BalanceSheet balances={balances} />
      </div>
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;

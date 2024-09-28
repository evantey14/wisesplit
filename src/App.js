import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BalanceSheet from './components/BalanceSheet';
import PaymentForm from './components/PaymentForm';
import PaymentList from './components/PaymentList';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [balances, setBalances] = useState({ evan: 0, neil: 0, sab: 0 });

  useEffect(() => {
    // Load data from server when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data');
      const data = await response.json();
      setExpenses(data.expenses || []);
      setPayments(data.payments || []);
      updateBalances(data.expenses || [], data.payments || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveData = async (updatedExpenses, updatedPayments) => {
    try {
      await fetch('http://localhost:3001/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expenses: updatedExpenses,
          payments: updatedPayments,
        }),
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, newExpense].sort((a, b) => a.date - b.date);
      updateBalances(updatedExpenses, payments);
      saveData(updatedExpenses, payments);
      return updatedExpenses;
    });
  };

  const handleAddPayment = (newPayment) => {
    setPayments((prevPayments) => {
      const updatedPayments = [...prevPayments, newPayment].sort((a, b) => a.date - b.date);
      updateBalances(expenses, updatedPayments);
      saveData(expenses, updatedPayments);
      return updatedPayments;
    });
  };

  const handleDeleteExpense = (expenseToDelete) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter(expense => expense !== expenseToDelete);
      updateBalances(updatedExpenses, payments);
      saveData(updatedExpenses, payments);
      return updatedExpenses;
    });
  };

  const handleDeletePayment = (paymentToDelete) => {
    setPayments((prevPayments) => {
      const updatedPayments = prevPayments.filter(payment => payment !== paymentToDelete);
      updateBalances(expenses, updatedPayments);
      saveData(expenses, updatedPayments);
      return updatedPayments;
    });
  };

  const updateBalances = (updatedExpenses, updatedPayments) => {
    let newBalances = { evan: 0, neil: 0, sab: 0 };
    
    // Calculate balances from expenses
    updatedExpenses.forEach((expense) => {
      const share = expense.amount / expense.paidFor.length;
      newBalances[expense.paidBy] += expense.amount;
      expense.paidFor.forEach((person) => {
        if (person !== expense.paidBy) {
          newBalances[person] -= share;
        }
      });
    });

    // Adjust balances based on payments
    updatedPayments.forEach((payment) => {
      newBalances[payment.from] -= payment.amount;
      newBalances[payment.to] += payment.amount;
    });

    setBalances(newBalances);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ExpenseForm onAddExpense={handleAddExpense} />
        <PaymentForm onAddPayment={handleAddPayment} />
      </div>
      <BalanceSheet balances={balances} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        <PaymentList payments={payments} onDeletePayment={handleDeletePayment} />
      </div>
    </div>
  );
}

export default App;

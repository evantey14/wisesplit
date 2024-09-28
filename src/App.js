import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import PaymentForm from './components/PaymentForm';
import PaymentList from './components/PaymentList';
import BalanceSheet from './components/BalanceSheet';
import PasswordProtection from './components/PasswordProtection';
import { parseISO } from 'date-fns';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const API_KEY = process.env.REACT_APP_API_KEY;

if (!API_KEY) {
  console.error('REACT_APP_API_KEY is not set in environment variables');
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/data`, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      if (response.data && typeof response.data === 'object') {
        setExpenses(response.data.expenses.map(expense => ({
          ...expense,
          date: parseISO(expense.date) // Convert date string to Date object
        })) || []);
        setPayments(response.data.payments.map(payment => ({
          ...payment,
          date: parseISO(payment.date) // Convert date string to Date object
        })) || []);
      } else {
        setError('Received unexpected data format from the server.');
      }
    } catch (error) {
      setError(`Failed to fetch data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await axios.post(`${API_URL}/expenses`, expense, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      setExpenses(response.data.map(exp => ({
        ...exp,
        date: parseISO(exp.date) // Convert date string to Date object
      })));
    } catch (error) {
      setError('Failed to add expense. Please try again.');
    }
  };

  const addPayment = async (payment) => {
    try {
      const response = await axios.post(`${API_URL}/payments`, payment, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      setPayments(response.data);
    } catch (error) {
      setError('Failed to add payment. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return <PasswordProtection onCorrectPassword={() => setIsAuthenticated(true)} />;
  }

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
          <ExpenseForm onAddExpense={addExpense} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Record Payment</h2>
          <PaymentForm onAddPayment={addPayment} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Balance Sheet</h2>
        <BalanceSheet expenses={expenses} payments={payments} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Expense History</h2>
        <ExpenseList expenses={expenses} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
        <PaymentList payments={payments} />
      </div>
    </div>
  );
}

export default App;

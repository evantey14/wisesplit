import React, { useState } from 'react';

function PaymentForm({ onAddPayment }) {
  const [payer, setPayer] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payment = {
      id: Date.now(),
      payer,
      recipient,
      amount: parseFloat(amount),
      date: new Date().toISOString()
    };
    onAddPayment(payment);
    setPayer('');
    setRecipient('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Payer"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Payment</button>
    </form>
  );
}

export default PaymentForm;
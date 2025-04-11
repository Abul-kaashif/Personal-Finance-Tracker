import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTransaction = () => {
    if (!desc || isNaN(amount) || amount === '') return;
    const newTransaction = {
      id: Date.now(),
      desc,
      amount: parseFloat(amount),
    };
    setTransactions([newTransaction, ...transactions]);
    setDesc('');
    setAmount('');
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income + expenses;

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <header>
          <h1>Finance Tracker</h1>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <section className="dashboard">
          <div className="card">
            <h2>Balance</h2>
            <p>${balance.toFixed(2)}</p>
          </div>
          <div className="card">
            <h2>Income</h2>
            <p>${income.toFixed(2)}</p>
          </div>
          <div className="card">
            <h2>Expenses</h2>
            <p>${Math.abs(expenses).toFixed(2)}</p>
          </div>
        </section>

        <section className="add-transaction">
          <h2>Add Transaction</h2>
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (use negative for expenses)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={addTransaction}>Add</button>
        </section>

        <section className="transactions">
          <h2>History</h2>
          <ul>
            {transactions.map((t) => (
              <li key={t.id} className={t.amount > 0 ? 'income' : 'expense'}>
                {t.desc} <span>{t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;

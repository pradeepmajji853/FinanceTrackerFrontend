import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import './SavingsWallet.css';
import { API_BASE_URL } from '../config';

const SavingsWallet = () => {
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  
    if (storedUserId) {
      fetchTransactions(storedUserId);
    }
  }, []);

  const fetchTransactions = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/savingswallet/${userId}`);
  
      const transactions = response.data.map(transaction => ({
        ...transaction,
        amount: Number(transaction.amount)
      }));
      setTransactions(transactions);

      const initialBalance = transactions.reduce((acc, transaction) => {
        return transaction.type === 'deposit' ? acc + transaction.amount : acc - transaction.amount;
      }, 0);
      setBalance(initialBalance);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTransaction = async (type) => {
    const parsedAmount = parseFloat(amount);

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }

    if (type === 'withdraw' && parsedAmount > balance) {
      setError('Insufficient funds.');
      return;
    }

    const newTransaction = {
      userId,
      type,
      amount: parsedAmount,
      date: new Date().toLocaleString()
    };

    try {
      await axios.post(`${API_BASE_URL}/savingswallet`, newTransaction);

      const newBalance = type === 'deposit'
        ? balance + parsedAmount
        : balance - parsedAmount;

      setBalance(newBalance);
      setTransactions([newTransaction, ...transactions]);
      setAmount('');
      setError('');
    } catch (error) {
      console.error('Error adding transaction:', error);
      setError('Failed to add transaction');
    }
  };

  return (
    <div className="outerSavingsWallet">
      <Sidebar />
      <div className="savings-wallet">
        <h2>Savings Wallet</h2>
        <div className="balance">
          <h3>Current Balance:₹ {balance.toFixed(2)}</h3>
        </div>
        <div className="transaction">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button onClick={() => handleTransaction('deposit')}>Deposit</button>
          <button onClick={() => handleTransaction('withdraw')}>Withdraw</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id} className={transaction.type}>
                <span>{transaction.type === 'deposit' ? '+' : '-'}{isNaN(transaction.amount) ? '0.00' : transaction.amount.toFixed(2)}</span>
                <span>{transaction.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavingsWallet;

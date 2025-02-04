import React, { useState, useEffect } from "react";
import faker from "faker";
import axios from 'axios'; 
import './BankConnect.css';
import { API_BASE_URL } from '../config';

const BankConnect = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fakeTransactions, setFakeTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const generateTransactions = (num) => {
    const transactions = [];
    for (let i = 0; i < num; i++) {
      const date = faker.date.past();
      transactions.push({
        id: faker.datatype.uuid(),
        date: date.toISOString().split('T')[0], 
        amount: parseFloat(faker.finance.amount()),
        description: faker.commerce.productName(),
        category: faker.commerce.department(),
        type: Math.random() > 0.5 ? 'Credit' : 'Debit' 
      });
    }
    return transactions;
  };
  

  const handleAddBankConnect = () => {
    setShowPopup(true);
  };

  const handlePopupClose = async () => {
    setShowPopup(false);
    const transactions = generateTransactions(10);
    setFakeTransactions(transactions);
  
    const totalBalance = transactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount); 
      return transaction.type === 'Credit' ? acc + amount : acc - amount;
    }, 0);
    setBalance(totalBalance);
  
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(`${API_BASE_URL}/BankAccountdashboard`, {
        userId,
        transactions
      });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error posting fake transactions:', error.response ? error.response.data : error.message);
    }
  };
  

  useEffect(() => {
    const fetchTransactions = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const { data } = await axios.get(`${API_BASE_URL}/BankAccountdashboard`, {
            params: { userId }
          });
        
          const processedTransactions = data.map(transaction => ({
            ...transaction,
            amount: parseFloat(transaction.amount)
          }));
          setFakeTransactions(processedTransactions);
          const totalBalance = processedTransactions.reduce((acc, transaction) => {
            const amount = parseFloat(transaction.amount);
            return transaction.type === 'Credit' ? acc + amount : acc - amount;
          }, 0);
          setBalance(totalBalance);
        } catch (error) {
          console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
        }
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="bank-connect">
      <button onClick={handleAddBankConnect}>Add Bank Connect</button>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>
              Note: "Please be aware that this is a prototype and not a production-level application.
              Consequently, we do not have the required permissions to access real bank transactions.
              Instead, we have generated simulated transactions that closely resemble real-time bank account data."
            </p>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
      <div className="balance-card">
        <h3>Current Balance</h3>
        <p>₹{typeof balance === 'number' ? balance.toFixed(2) : '0.00'}</p>
      </div>
      <div className="transactions-list">
        <h3>Fake Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {fakeTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>₹{typeof transaction.amount === 'number' ? transaction.amount.toFixed(2) : '0.00'}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankConnect;

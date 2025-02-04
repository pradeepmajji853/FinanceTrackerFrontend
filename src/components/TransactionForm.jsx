import React, { useState } from 'react';
import axios from 'axios';
import './TransactionForm.css';
import { API_BASE_URL } from '../config';

export default function TransactionForm({ onClose }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/transactions`, {
        userId,
        amount,
        description,
        category,
        date,
        type
      });
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="TransactionForm">
      <div className="overlay" onClick={onClose}></div>
      <div className="form-container">
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="All categories">All categories</option>
          <option value="Beauty">Beauty</option>
          <option value="Bills & fees">Bills & fees</option>
          <option value="Car">Car</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Family & Personal">Family & Personal</option>
          <option value="Food & Drink">Food & Drink</option>
          <option value="Gifts">Gifts</option>
          <option value="Groceries">Groceries</option>
          <option value="Health">Health</option>
          <option value="Home">Home</option>
          <option value="Others">Others</option>
          <option value="Shopping">Shopping</option>
          <option value="Sports & Hobbies">Sports & Hobbies</option>
          <option value="Transport">Transport</option>
          <option value="Travel">Travel</option>
          <option value="Work">Work</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
}

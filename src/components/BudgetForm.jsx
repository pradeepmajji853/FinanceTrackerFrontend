import React, { useState, useEffect } from 'react';
import './BudgetForm.css';

export default function BudgetForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    budgetName: '',
    amount: '',
    currency: 'USD',
    category: '',
    recurrence: 'Monthly',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      let endDate;
      if (formData.recurrence === 'Monthly') {
        endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
      } else if (formData.recurrence === 'Yearly') {
        endDate = new Date(startDate);
        endDate.setFullYear(startDate.getFullYear() + 1);
      }
      setFormData({ ...formData, endDate: endDate.toISOString().split('T')[0] });
    }
  }, [formData.recurrence, formData.startDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Budget</h2>
      <div className="form-group">
        <label className="form-label" htmlFor="budgetName">Budget Name</label>
        <input
          type="text"
          id="budgetName"
          name="budgetName"
          className="form-input"
          value={formData.budgetName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="form-input"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="currency">Currency</label>
        <select
          id="currency"
          name="currency"
          className="form-select"
          value={formData.currency}
          onChange={handleChange}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="form-select"
          value={formData.category}
          onChange={handleChange}
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
        <label className="form-label" htmlFor="recurrence">Recurrence</label>
        <div className="recurrence-options">
          <button
            type="button"
            className={`recurrence-button ${formData.recurrence === 'Monthly' ? 'active' : ''}`}
            onClick={() => setFormData({ ...formData, recurrence: 'Monthly' })}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`recurrence-button ${formData.recurrence === 'Yearly' ? 'active' : ''}`}
            onClick={() => setFormData({ ...formData, recurrence: 'Yearly' })}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="form-input"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="form-input"
          value={formData.endDate}
          onChange={handleChange}
          required
          readOnly
        />
      </div>
      <button type="submit" className="submit-button">Add Budget</button>
    </form>
  );
}

import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar.jsx";
import Button from '@mui/material/Button';
import BudgetForm from "./BudgetForm.jsx";
import './Budgets.css';
import { API_BASE_URL } from '../config';

export default function Budgets() {
  const [showForm, setShowForm] = useState(false);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch(`${API_BASE_URL}/budgets/${userId}/details`);
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgetDetails();
  }, []);

  const handleFormSubmit = async (newBudget) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`${API_BASE_URL}/budgets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, ...newBudget })
      });
      const data = await response.json();
      setBudgets([...budgets, data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  return (
    <div className="outerbudgets">
      <Sidebar />
      <div className="Budgets">
        <div className="BudgetCard">
          <p>Control your expenses with our smart budgets</p>
          <Button
            variant="contained"
            color="success"
            className="AddBudgetButton"
            onClick={() => setShowForm(true)}
          >
            Add Budget
          </Button>
        </div>
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <BudgetForm onFormSubmit={handleFormSubmit} />
            </div>
          </div>
        )}
        <div className="BudgetList">
          {budgets.map((budget, index) => (
            <div className="BudgetCard" key={index}>
              <h3>{budget.budgetName}</h3>
              <div className="progress-bar">
                <div
                  className="progress-bar-spent"
                  style={{ width: `${(budget.spentAmount / budget.amount) * 100}%` }}
                ></div>
                <div
                  className="progress-bar-remaining"
                  style={{ width: `${(1 - budget.spentAmount / budget.amount) * 100}%` }}
                ></div>
              </div>
              <p><strong>Amount:</strong> {budget.amount} {budget.currency}</p>
              <p><strong>Spent:</strong> {budget.spentAmount} {budget.currency}</p>
              <p><strong>Remaining:</strong> {budget.remainingAmount} {budget.currency}</p>
              <p><strong>Category:</strong> {budget.category}</p>
              <p><strong>Recurrence:</strong> {budget.recurrence}</p>
              <p><strong>Start Date:</strong> {budget.startDate}</p>
              <p><strong>End Date:</strong> {budget.endDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

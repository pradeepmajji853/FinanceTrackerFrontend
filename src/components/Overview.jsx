import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from "./Sidebar.jsx";
import "./Overview.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_BASE_URL, getAuthHeaders } from '../config';
import { useNavigate } from 'react-router-dom';

export default function Overview() {
    const [transactions, setTransactions] = useState([]);
    const [balanceData, setBalanceData] = useState([]);
    const [incomeExpensesData, setIncomeExpensesData] = useState([]);
    const [period, setPeriod] = useState('day');
    const [date, setDate] = useState(new Date());
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const headers = getAuthHeaders();
        
        axios.get(`${API_BASE_URL}/transactions?userId=${userId}`, { headers })
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the transactions!", error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            });

        axios.get(`${API_BASE_URL}/balance-over-time?userId=${userId}`, { headers })
            .then(response => {
                setBalanceData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the balance data!", error);
            });

        fetchIncomeExpensesData(period, date);
    }, [userId, period, date]);

    const fetchIncomeExpensesData = (period, date) => {
        const headers = getAuthHeaders();
        axios.get(`${API_BASE_URL}/income-expenses?userId=${userId}&period=${period}&date=${date.toISOString().split('T')[0]}`, { headers })
            .then(response => {
                setIncomeExpensesData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the income and expenses data!", error);
            });
    };

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

  
    const categoryData = transactions.reduce((acc, transaction) => {
        const { category, amount } = transaction;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += parseFloat(amount);
        return acc;
    }, {});

    const pieChartData = Object.keys(categoryData).map(key => ({
        name: key,
        value: categoryData[key],
        percent: categoryData[key] / Object.values(categoryData).reduce((a, b) => a + b, 0) * 100,
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    const formatXAxis = (tickItem) => {
        const date = new Date(tickItem);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <div className="Overview">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="content-container">
                <div className="chart-container">
                    <h2>Spending by Category</h2>
                    <PieChart width={600} height={400}>
                        <Pie
                            data={pieChartData}
                            cx={300}
                            cy={200}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            label={false}  // Disable labels inside pie slices
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            content={({ payload }) => (
                                <div className="custom-legend">
                                    {payload.map((entry, index) => (
                                        <div key={`item-${index}`} style={{ color: entry.payload.fill }}>
                                            {entry.payload.name}: {entry.payload.percent.toFixed(0)}%
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                    </PieChart>

                    <h2>Balance Over Time</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={balanceData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={formatXAxis} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="balance"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                                animationDuration={1000}  // Duration of the animation
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    
                </div>
            </div>
        </div>
    );
}


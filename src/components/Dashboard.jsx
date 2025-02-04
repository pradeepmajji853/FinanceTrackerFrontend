import React from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import CashWallet from "./CashWallet";

export default function Dashboard() {
  const userId = localStorage.getItem("userId");

  return (
    <div className="Dashboard">
      <Sidebar />
      <div className="MainContent">
        <div className="DashboardNav">
          <ul>
            <li>
              <NavLink to="/dashboard" activeClassName="active">CASH WALLETS</NavLink>
            </li>
            <li>
              <NavLink to="/BankAccountdashboard" activeClassName="active">BANK ACCOUNTS</NavLink>
            </li>
          </ul>
        </div>
        <div className="Content">
          <CashWallet />
        </div>
      </div>
    </div>
  );
}

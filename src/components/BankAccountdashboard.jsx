import React from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import BankConnect from "./BankConnect";

export default function BankAccountdashboard() {
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
          <BankConnect/>
        </div>
      </div>
    </div>
  );
}

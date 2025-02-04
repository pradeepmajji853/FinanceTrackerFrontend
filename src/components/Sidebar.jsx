import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import LogoutButton from "./logout";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="Sidebar">
      <div className="title">
        <h1>Campus Cash</h1>
      </div>
      <div className="elements">
        <ul>
          <li className={location.pathname === "/dashboard"|location.pathname==="/BankAccountdashboard" ? "active" : ""}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === "/overview" ? "active" : ""}>
            <Link to="/overview">Overview</Link>
          </li>
          <li className={location.pathname === "/budgets" ? "active" : ""}>
            <Link to="/budgets">Budgets</Link>
          </li>
          <li className={location.pathname === "/savingswallet" ? "active" : ""}>
            <Link to="/savingswallet">Savings Wallet</Link>
          </li>
        </ul>
        <LogoutButton/>
      </div>
    </div>
  );
}

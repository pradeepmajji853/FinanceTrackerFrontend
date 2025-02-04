import React from 'react';
import Navbar from "./Navbar.jsx"
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
    {children}
    </div>
  );
};

export default Layout;

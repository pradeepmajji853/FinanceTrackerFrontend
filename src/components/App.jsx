import "./App.css";
import Heropage from "./Heropage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Features from "./Features.jsx";
import Getstarted from "./Getstarted.jsx";
import Layout from "./Layout.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import Overview from "./Overview.jsx";
import Budgets from "./Budgets.jsx";
import SavingsWallet from "./SavingsWallet.jsx";
import BankAccountdashboard from "./BankAccountdashboard.jsx"
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Heropage />
              <Features />
              <Getstarted />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Layout>
                <Overview/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Budgets"
          element={
            <ProtectedRoute>
              <Layout>
                <Budgets/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/savingswallet"
          element={
            <ProtectedRoute>
              <Layout>
                <SavingsWallet/>
              </Layout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/BankAccountdashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <BankAccountdashboard/>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}














export default App;

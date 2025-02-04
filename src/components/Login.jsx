import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import RLhead from "./RLhead";
import "./Login.css";
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL, handleResponse } from '../config';

const Login = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await handleResponse(response);
      
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        setMessage("Login successful. Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError("form", { type: "manual", message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("There was an error!", error);
      setError("form", { type: "manual", message: error.message });
    }
  };

  return (
    <>
      <RLhead />
      <div className="Register">
        <div className="RLcard">
          <h1>Login to Campus Cash</h1>
          <h3>
            Don't have an account yet? <Link to="/register">Sign-up!</Link>
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="registerform">
              <li>
                <label htmlFor="email" className="labels">
                  Email:
                </label>
                <input
                  className={`inputel ${errors.email ? "error-border" : ""}`}
                  placeholder="Email"
                  type="text"
                  {...register("email", {
                    required: "This field is required",
                    minLength: { value: 5, message: "Minimum length is 5" },
                  })}
                />
                {errors.email && <p className="error-text">{errors.email.message}</p>}
              </li>
              <li>
                <label htmlFor="password" className="labels">
                  Password:
                </label>
                <input
                  className={`inputel ${errors.password ? "error-border" : ""}`}
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "This field is required",
                    minLength: { value: 5, message: "Minimum length is 5" },
                  })}
                />
                {errors.password && <p className="error-text">{errors.password.message}</p>}
              </li>
              <li>
                <input
                  disabled={isSubmitting}
                  type="submit"
                  value="Login to Campus Cash"
                  className="inputSub"
                />
              </li>
              {isSubmitting && <p>Loading...</p>}
              {errors.form && <p className="error-text">{errors.form.message}</p>}
              {message && <p className="success-text">{message}</p>}
            </ul>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

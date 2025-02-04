import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RLhead from "./RLhead";
import { Link } from "react-router-dom";
import "./Register.css";
import { API_BASE_URL } from '../config';


const Register = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      const result = await response.json();
  
      if (result.message === "Registration successful") {
        setMessage("Registration successful. Redirecting to dashboard...");
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userId", result.user.id); 
  
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError("form", { type: "manual", message: result.message });
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
          <h1>Signup to Campus Cash</h1>
          <h3>
            Already have an account? <Link to="/login">Login here!</Link>
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="registerform">
              <div className="name-container">
                <li>
                  <label htmlFor="firstName" className="labels">
                    First Name:
                  </label>
                  <input
                    className={`inputel ${errors.firstName ? "error-border" : ""}`}
                    placeholder="First Name"
                    type="text"
                    {...register("firstName", {
                      required: { value: true, message: "This field is required" },
                    })}
                  />
                  {errors.firstName && (
                    <span className="error-icon" title={errors.firstName.message}>!</span>
                  )}
                  {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
                </li>
                <li>
                  <label htmlFor="lastName" className="labels">
                    Last Name:
                  </label>
                  <input
                    className={`inputel ${errors.lastName ? "error-border" : ""}`}
                    placeholder="Last Name"
                    type="text"
                    {...register("lastName", {
                      required: { value: true, message: "This field is required" },
                    })}
                  />
                  {errors.lastName && (
                    <span className="error-icon" title={errors.lastName.message}>!</span>
                  )}
                  {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
                </li>
              </div>
              <li>
                <label htmlFor="email" className="labels">
                  Email:
                </label>
                <input
                  className={`inputel ${errors.email ? "error-border" : ""}`}
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: { value: true, message: "This field is required" },
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                />
                {errors.email && (
                  <span className="error-icon" title={errors.email.message}>!</span>
                )}
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
                    required: { value: true, message: "This field is required" },
                    minLength: { value: 8, message: "Minimum length is 8" },
                  })}
                />
                {errors.password && (
                  <span className="error-icon" title={errors.password.message}>!</span>
                )}
                {errors.password && <p className="error-text">{errors.password.message}</p>}
              </li>
              <li>
                <label htmlFor="confirmPassword" className="labels">
                  Confirm Password:
                </label>
                <input
                  className={`inputel ${errors.confirmPassword ? "error-border" : ""}`}
                  placeholder="Confirm Password"
                  type="password"
                  {...register("confirmPassword", {
                    required: { value: true, message: "This field is required" },
                    minLength: { value: 8, message: "Minimum length is 8" },
                    validate: (value) =>
                      value === getValues("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="error-icon" title={errors.confirmPassword.message}>!</span>
                )}
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
              </li>
              <li>
                <input
                  disabled={isSubmitting}
                  type="submit"
                  value="Sign-up to Campus Cash"
                  className="inputSub"
                />
              </li>
              <div>{isSubmitting && <p>Loading...</p>}</div>
              <div>{errors.form && <p className="error-text">{errors.form.message}</p>}</div>
              {message && <p className="success-text">{message}</p>}
            </ul>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

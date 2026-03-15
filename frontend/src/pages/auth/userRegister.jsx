import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";

const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          fullName: fullName,
          email: email,
          password: password,
        },{
          withCredentials: true,
        }
      );
      
      // Save user info to local storage so Home.jsx recognizes the login
      if (response.data && response.data.user) {
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("token", response.data.token || "mock_token");
      }
      
      // Redirect the user to the main feed after successful registration
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="register-title">
        <header>
          <h1 id="register-title" className="auth-title">
            Create account
          </h1>
          <p className="auth-subtitle">
            Register as a normal user to start exploring.
          </p>
        </header>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" placeholder="xxxx" />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="xxxx@example.com"
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/choose-register" className="auth-submit ghost">
              Back to Register
            </Link>
            <button className="auth-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;

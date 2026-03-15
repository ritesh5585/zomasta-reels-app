import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Login data submitted:", {
      email,
      password,
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      navigate("/");
    } catch (error) {
      console.error("Login failed from userLogin.jsx:", error);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="login-title">
        <header>
          <h1 id="login-title" className="auth-title">
            Welcome back
          </h1>
          <p className="auth-subtitle">
            Sign in to continue to your account. OR
          </p>
          <Link to="/partner/login" className="auth-subtitle">
            Partner Login
          </Link>
        </header>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
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
            <Link to="/user/register" className="auth-submit ghost">
              Create account
            </Link>
            <button className="auth-submit" type="submit">
              Submit
            </button>
          </div>
        </form>

        <div className="auth-alt-action" style={{ marginTop: "8px" }}>
          Forgot your password? <Link to="/user/reset">Reset</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

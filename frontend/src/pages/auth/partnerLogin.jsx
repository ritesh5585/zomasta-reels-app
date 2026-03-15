import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";
import axios from "axios";

const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("partner login submitted", {
      email,
      password,
    });
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/foodpartner/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      localStorage.setItem("token", response.data.token);

      console.log(localStorage.getItem("token"));

      navigate("/create-food");
    } catch (error) {
      console.log("partber login failed", error);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="partner-login-title"
      >
        <header>
          <h1 id="partner-login-title" className="auth-title">
            Partner sign in
          </h1>
          <p className="auth-subtitle">Manage your business and orders.</p>
        </header>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
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
            <Link to="/user/login" className="auth-submit ghost">
              &larr; Back
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

export default PartnerLogin;

import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/auth-shared.css";

const userReset = () => {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-reset-title">
        <header>
          <h1 id="user-reset-title" className="auth-title">Reset your password</h1>
          <p className="auth-subtitle">Enter your email to receive a reset link.</p>
        </header>

        <form className="auth-form" noValidate>
          <div className="field-group">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="xxxx@example.com" />
          </div>

          <div style={{display:'flex', gap:12, justifyContent:'space-between', alignItems:'center'}}>
            <Link to="/user/login" className="auth-submit ghost">Back to sign in</Link>
            <button className="auth-submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default userReset

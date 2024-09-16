import React, { useState } from 'react';
import "../../../components/auth/resetPassword/Reset.css";
import { Link } from "react-router-dom";

function Reset() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  return <div className="reset-background">
      <div className="reset-inner">
        <div className="reset-left">
          <img src="/images/resetpet.png" alt="Logo" />
        </div>
        <div className="reset-right">
          <h1>Reset Your Password?</h1>
          <p>Enter a new password below to reset your password</p>
          <form onSubmit={handleSubmit} className="re-form">
            <div className="form-in-reset">
              <label>New Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
            </div>
            <div className="form-in-reset">
              <label>Confirm New Password:</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Enter your password again" required />
            </div>
            <div className="reset-btn">
              <Link to="/resetSuccess" className="btn-reset">
                Reset Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>;
}

export default Reset
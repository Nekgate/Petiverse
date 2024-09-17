import React, { useState } from "react";
import "../../../components/auth/signup/SignBody.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/authenticationApi";
import axios from "axios";

function SignBody() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    rememberMe: false
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    // Send form data to backend
    const response = await registerUser({
      username: formData.username,
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber
    });
    console.log("Registration successful:", response);

    // Navigate to the "Check Email" page
    navigate("/almostDone");
  };

  return (
    <div className="create-account">
      <div className="create-inner">
        <h2 className="cre-head">Create An Account</h2>
        <p className="cre-para">
          Connect with fellow pet lovers, share your furry friend's moments
        </p>
        <form onSubmit={handleSubmit} className="cre-form">
          <div className="form-in">
            <label>User Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your pet name"
              required
            />
          </div>
          <div className="form-in">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your pet name"
              required
            />
          </div>
          <div className="form-in">
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-in">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-in">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-in">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password again"
              required
            />
          </div>
          <div className="form-check">
            <input
              className="box-check"
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label>remember me</label>
          </div>
          <div className="create-btn">
            <button type="submit" className="btn-create">
              {" "}Create Account
            </button>
            <Link to="/login" className="btn-log">
              Login
            </Link>
          </div>
        </form>

        <p>Already have an account? Click login to sign in!</p>
      </div>
    </div>
  );
}

export default SignBody;

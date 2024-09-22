import React, { useState } from "react";
import "../../../components/auth/signup/SignBody.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/authenticationApi";

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

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Something went wrong. Please try again.");
      return;
    }

    setLoading(true); // Set loading to true

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

  return <div className="create-account">
      <div className="create-inner">
        <h2 className="cre-head">Create An Account</h2>
        <p className="cre-para">
          Connect with fellow pet lovers, share your furry friend's moments
        </p>
        <form onSubmit={handleSubmit} className="cre-form">
          <div className="signup-top">
            <div className="form-in one">
              <label>User Name:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your pet name" required />
            </div>
            <div className="form-in">
              <label>Full Name:</label>
              <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter your pet name" required />
            </div>
          </div>

          <div className="form-in">
            <label>Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
          </div>
          <div className="form-in">
            <label>Phone Number:</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" required />
          </div>
          <div className="form-in">
            <div className="top-tog1">
              <label>Password:</label>
              <span onClick={togglePasswordVisibility} className="toggle-password">
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          </div>
          <div className="form-in">
            <div className="top-tog1">
              <label>Confirm Password:</label>
              <span onClick={toggleConfirmPasswordVisibility} className="toggle-password">
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>

            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Enter your password again" required />
          </div>
          <div className="form-check">
            <input className="box-check" type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
            <label>remember me</label>
          </div>
          <div className="create-btn">
            <button type="submit" className="btn-create" disabled={loading}>
              {loading ? "Please wait..." : "Create Account"}
            </button>
            <Link to="/login" className="btn-log">
              Login
            </Link>
          </div>
        </form>
        {message && <p className="err-mesg">
            {message}
          </p>}
        <p>Already have an account? Click login to sign in!</p>
      </div>
    </div>;
}

export default SignBody;

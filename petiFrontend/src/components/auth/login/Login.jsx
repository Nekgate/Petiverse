import React, {useState} from 'react';
import "../../../components/auth/login/Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    rememberMe: false
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

  return <div className="login-background">
      <div className="login-inner">
        <h2 className="log-head">Login</h2>
        <p className="log-para">
          Connect with fellow pet lovers, share your furry friend's moments
        </p>
        <form onSubmit={handleSubmit} className="log-form">
          <div className="form-in">
            <label>Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
          </div>
          <div className="form-in">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
          </div>
          <div className="log-check-low">
            <div className="form-check">
              <input className="box-check" type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
              <label>remember me</label>
            </div>
            <div>
              <Link to="/forgotPassword">Forgot password?</Link>
            </div>
          </div>
          <div className="login-btn">
            <button type="submit" className="btn-create">
              Login
            </button>
            <Link to="/signup" className="btn-log">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>;
}


export default Login
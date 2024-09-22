import React, { useState } from "react";
import "../../../components/auth/login/Login.css";
import { Link } from "react-router-dom";
import { authenticateUser } from "../../../api/authenticationApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); // Set loading when the form is submitted

    try {
      console.log(formData);
      const userData = await authenticateUser(formData);
      console.log("userData:", userData);

      navigate("/dashboard");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  return (
    <div className="login-background">
      <div className="login-inner">
        <h2 className="log-head">Login</h2>
        <p className="log-para">
          Connect with fellow pet lovers, share your furry friend's moments
        </p>
        <form onSubmit={handleSubmit} className="log-form">
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
            <div className="top-tog2">
              <label>Password:</label>
              <span
                onClick={togglePasswordVisibility}
                className="toggle-password"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="log-check-low">
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
            <div>
              <Link to="/forgotPassword" className="f-log">
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="login-btn">
            <button type="submit" className="btn-create" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
            <Link to="/signup" className="btn-log">
              Create Account
            </Link>
          </div>
        </form>
        {message &&
          <p className="err-mesg">
            {message}
          </p>}
      </div>
    </div>
  );
}

export default Login;

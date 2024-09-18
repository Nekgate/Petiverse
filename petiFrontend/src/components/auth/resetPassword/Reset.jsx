import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../components/auth/resetPassword/Reset.css";
import { resetPassword } from "../../../api/authenticationApi";

function Reset() {
  const { token } = useParams(); // Get token from URL
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Call the API to reset the password
      await resetPassword({ password: formData.password, token });
      // On success, navigate to the success screen
      navigate("/resetSuccess");
    } catch (error) {
      setMessage("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-background">
      <div className="reset-inner">
        <div className="reset-left">
          <img src="/images/resetpet.png" alt="Logo" />
        </div>
        <div className="reset-right">
          <h1>Reset Your Password?</h1>
          <h6>Enter a new password below to reset your password</h6>
          <form onSubmit={handleSubmit} className="re-form">
            <div className="form-in-reset">
              <div className="top-tog">
                <label>New Password:</label>
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
            <div className="form-in-reset">
              <div className="top-tog">
                <label>Confirm New Password:</label>
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="toggle-password"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password again"
                required
              />
            </div>

            <div className="reset-btn">
              <button type="submit" disabled={isLoading} className="btn-reset">
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
          {message &&
            <p>
              {message}
            </p>}
        </div>
      </div>
    </div>
  );
}

export default Reset;

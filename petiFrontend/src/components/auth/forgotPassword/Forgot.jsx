import React, { useState } from "react";
import "../../../components/auth/forgotPassword/Forgot.css";
import { useNavigate } from "react-router-dom";
import { sendResetEmail } from "../../../api/authenticationApi";

function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await sendResetEmail({ email });
      // On successful request, navigate to the CheckEmail screen
      navigate("/checkEmail"); // Navigate to CheckEmail screen
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-background">
      <div className="forgot-inner">
        <div className="forgot-left">
          <img src="/images/forpet.png" alt="Logo" />
        </div>
        <div className="forgot-right">
          <h1>Forgot Your Password?</h1>
          <h6>Enter the email connected to your account.</h6>
          <form onSubmit={handleSubmit} className="for-form">
            <div className="for-form-in">
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>
            <button type="submit" disabled={isLoading} className="btn-forgot">
              {isLoading ? "Please wait..." : "Reset Password"}
            </button>
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

export default Forgot;

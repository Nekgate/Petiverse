import React, { useState } from "react";
import "../../../components/auth/almostDone/AlmostBody.css";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../api/authenticationApi";

function AlmostBody() {
  const [verificationToken, setVerificationToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    
      try {
        const response = await verifyEmail({ token: verificationToken });
        console.log("Email verified successfully:", response);
        navigate("/successSignup");
      } catch (error) {
        console.error("Verification error:", error.message);
      }
    };

  return <div className="almost-background">
      <div className="almost-inner">
        <div className="almost-left">
          <img src="/Images/allpet1.png" alt="Logo" />
        </div>
        <div className="almost-right">
          <h1>Almost Done!</h1>
          <p>Input the 6 digit number that has been sent to your email.</p>
          <form onSubmit={handleSubmit} className="all-form">
            <div className="all-form-in">
              <input type="text" value={verificationToken} onChange={e => setVerificationToken(e.target.value)} placeholder="Enter your 6-digit code" />
            </div>
            <button type="submit" className="btn-almost">
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </div>;
}

export default AlmostBody;

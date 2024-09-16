import React from 'react';
import "../../../components/auth/checkEmail/Check.css";
import { Link } from "react-router-dom";

function Check() {
  return <div className="check-background">
      <div className="check-inner">
        <div className="check-right">
          <h1>Check Your Email</h1>
          <p>
            An email has been sent to your address with instructions to reset
            your password. Please check your inbox and follow the link
            provided to create a new password.
          </p>
          <Link to="/resetPassword">
            <p>Enter</p>
          </Link>
        </div>
        <div className="check-left">
          <img src="/images/checkpet.png" alt="Logo" />
        </div>
      </div>
    </div>;
}

export default Check
import React from 'react';
import "../../../components/auth/resetSuccess/ResetSuccess.css";
import { Link } from "react-router-dom";

function ResetSuccess() {
  return <div className="succ-res-background">
      <div className="succ-res-inner">
        <div className="succ-res-right">
          <h1>Password Reset Successful</h1>
          <p>
            Your password has been successfully reset,You can now log in with
            your new password
          </p>
          <Link to="/login" className="btn-succ-res">
              Login
          </Link>
        </div>
        <div className="succ-res-left">
          <img src="/images/pssres.png" alt="Logo" />
        </div>
      </div>
    </div>;
}

export default ResetSuccess
import React from 'react';
import "../../../components/auth/success/Success.css";
import { Link } from "react-router-dom";

function Success() {
  return <div className="success-background">
      <div className="success-inner">
        <div className="success-right">
          <h1>Account created succesfully!</h1>
          <p>
            Your account has been successfully created,You can now log in.
          </p>
          <Link to="/login" className="btn-success">
              Login
          </Link>
        </div>
        <div className="success-left">
          <img src="/images/suspet1.png" alt="Logo" />
        </div>
      </div>
    </div>;
}

export default Success
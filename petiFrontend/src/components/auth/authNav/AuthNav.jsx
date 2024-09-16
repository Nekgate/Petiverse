import React from 'react';
import "../../../components/auth/authNav/AuthNav.css";
import { Link } from "react-router-dom";

function AuthNav() {
  return <div className="auth-Background">
      <div className="col-one">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
      </div>
    </div>;
}

export default AuthNav
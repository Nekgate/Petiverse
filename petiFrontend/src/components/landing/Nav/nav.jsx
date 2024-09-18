import React from "react";
import "../../../components/landing/Nav/nav.css";
import { Link } from "react-router-dom";

function nav() {
  return <div className="Background">
      <div className="col-one">
        <img src="/Images/logo.png" alt="Logo" />
      </div>
      <div className="col-two">
        <ul>
          <li>
            <a href="#section-one">
              Home
            </a>
          </li>
          <li>
            <a href="#section-three">
              Services
            </a>
          </li>
          <li>
            <a href="#section-five">
              About
            </a>
          </li>
          <li>
            <a href="#section-six">
              Article
            </a>
          </li>
        </ul>
      </div>
      <div className="col-three">
        <Link to="/login" className="btn-1">
          Sign in
        </Link>
        <Link to="/signup" className="btn-2">
          Sign up
        </Link>
      </div>
    </div>;
}

export default nav;

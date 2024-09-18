import React from "react";
import "../../../components/dashboard/nav/Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Background">
      <div className="col-one">
        <img src="/Images/logo.png" alt="Logo" />
      </div>
      <div className="col-two">
        <ul>
          <li>Menu</li>
          <li>Notification</li>
          <li>Message</li>
          <li>Profile</li>
        </ul>
      </div>
      <div className="col-three">
        {/* <Link to="/login" className="btn-1">
          Sign in
        </Link> */}
        <Link to="/signup" className="btn-2">
          Log out
        </Link>
      </div>
    </div>
  );
}

export default Nav;

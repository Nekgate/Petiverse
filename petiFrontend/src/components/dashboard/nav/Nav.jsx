import React from "react";
import "../../../components/dashboard/nav/Nav.css";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";

function Nav() {
  return <div className="Background">
      <div className="col-one">
        <img src="/Images/logo.png" alt="Logo" />
      </div>
      <div className="col-two">
        <ul>
          <li className="dnav">
            <FiMenu className="icon" />Menu
          </li>
          <li className="dnav">
            <FiBell className="icon" />Notification
          </li>
          <li className="dnav">
            <FiMessageCircle className="icon" />Message
          </li>
          <li className="dnav">
            <FiUser className="icon" />Profile
          </li>
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
    </div>;
}

export default Nav;

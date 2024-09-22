import React from "react";
import { FiUser } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import "../../../components/dashboard/subNav/SubNav.css";

function SubNav() {
  return (
    <div className="subnav-background">
      <div className="subnav-inner">
        <ul className="sub-ul">
          <li className="sub-li">
            <FiHome className="icon-sub" />Home
          </li>
          <li className="sub-li">
            <FiVideo className="icon-sub" />Videos
          </li>
          <li className="sub-li">
            <FiUser className="icon-sub" />Friends
          </li>
          <li className="sub-li">
            <FiUsers className="icon-sub" />Groups
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SubNav;

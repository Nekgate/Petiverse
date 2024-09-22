import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { FiThermometer } from "react-icons/fi";
import "../../../components/dashboard/sideBar/SideBar.css"

function SideBar() {
  return <div className="side-background">
      <div className="side-inner">
        <div className="side-inn-top">
          <div className="side-top">
            <div className="side-top-left">
              <div className="sideprof-img">
                <img src="/Images/sideprof.png" alt="Logo" />
              </div>
              <div className="side-top-per">
                <h4>Tabitha Job</h4>
                <p>view profile</p>
              </div>
            </div>
            <FiMoreVertical />
          </div>
          <div className="side-main-nav">
            <ul>
              <li>
                <FiMenu className="icon" />Menu
              </li>
              <li>
                <FiBell className="icon" />Notification
              </li>
              <li>
                <FiMessageCircle className="icon" />Messages
              </li>
              <li>
                <FiBookmark className="icon" />Saved
              </li>
              <li>
                <FiStar className="icon" />Favorites
              </li>
              <li>
                <FiUser className="icon" />Friends
              </li>
              <li>
                <FiUsers className="icon" />Groups
              </li>
              <li>
                <FiVideo className="icon" />Videos
              </li>
              <li>
                <FiThermometer className="icon" />Find a Vet
              </li>
            </ul>
          </div>
        </div>
        <div className="side-inn-low">
          <button>Post</button>
          <p>
            Privacy terms and policy | copyright©| All rights reserved |
            designed by petriverse
          </p>
        </div>
      </div>
    </div>;
}

export default SideBar;

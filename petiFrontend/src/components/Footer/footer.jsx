import React from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { FiTwitter } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import "../Footer/footer.css";

function footer() {
  return <div className="footer-background">
      <div className="footer-inner">
        <div className="top-batch">
          <div className="foot-left">
            <div>
              <img src="/images/d-logo.png" alt="img" />
            </div>
            <p>
              The unconditional love of a pet can do more than keep you
              company. Pets may also decrease stress, improve heart health,
              and even help children with their emotional and social skills.
            </p>
            <div className="icons">
              <MdOutlineMailOutline className="foot-a" />
              <FiTwitter className="foot-a" />
              <FiLinkedin className="foot-a" />
            </div>
          </div>
          <div className="foot-right">
            <div className="list-1">
              <ul>
                <h5>Links</h5>
                <li>Home</li>
                <li>Our Services</li>
                <li>About Us</li>
                <li>Articles</li>
                <li>Reviews</li>
              </ul>
            </div>
            <div className="list-1">
              <ul>
                <h5>Support</h5>
                <li>Customer service</li>
                <li>Help center</li>
                <li>Call support</li>
                <li>Support center</li>
              </ul>
            </div>
          </div>
        </div>
        <p className='copy'>copyright© | All rights reserved | Terms and Privacy Policy</p>
      </div>
    </div>;
}

export default footer
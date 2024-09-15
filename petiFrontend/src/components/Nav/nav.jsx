import React from 'react';
import "../Nav/nav.css";

function nav() {
  return <div className="Background">
      <div className="col-one">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <div className="col-two">
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Services</li>
          <li>Articles</li>
        </ul>
      </div>
      <div className="col-three">
        <button className='btn-1'>Sign in</button>
        <button className='btn-2'>Sign up</button>
      </div>
    </div>;
}

export default nav
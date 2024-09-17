import React from 'react';
import "./hero.css"

function hero() {
  return <div className='hero-background'>
      <div className='hero-inner'>
        <div className="left">
          <h1>
            Social Media For <span>Pet Lovers!</span>
          </h1>
          <p>
            Connect with fellow pet lovers, share your furry friend's moments,
            and build a community where every pet is a star.
          </p>
          <div className='hero-btn'>
            <button className='mini-btn'>Get Started</button>
          </div>
        </div>
        <div className="right">
          <img src="/Images/hero.png" alt="img" />
        </div>
      </div>
    </div>;
}

export default hero
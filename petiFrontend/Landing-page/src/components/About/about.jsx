import React from 'react';
import "../About/about.css";

function about() {
  return <div className='about-background'>
      <div className='about-inner'>
        <div className="about-left">
          <p>Our Mission</p>
          <h1>About Us</h1>
          <h4>
            At Petiverse, we believe that pets are more than just
            animals—they’re family. Our mission is to create a warm and
            inclusive space where pet lovers can come together to share their
            stories, seek advice, and celebrate the joys of pet ownership. We
            aim to foster a community where every pet, from the tiniest
            hamster to the largest dog, is celebrated and valued.
          </h4>
          <button>Learn More</button>
        </div>
        <div className="about-right">
          <img src="/images/woman.png" alt="img" />
        </div>
      </div>
    </div>;
}

export default about
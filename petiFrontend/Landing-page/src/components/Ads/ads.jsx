import React from 'react';
import "../Ads/ads.css";

function ads() {
  return <div className="ads-background">
      <img src="/images/back-img.png" alt="Logo" className="back-ads" />
      <div className='ads-over'>
        <h1>Transform your pets ideas</h1>
        <p>Get thrilling updates about animal related topics</p>
        <button>Get Started</button>
      </div>
    </div>;
}

export default ads
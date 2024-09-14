import React from 'react';
import "../Articles/article.css";

function article() {
  return <div className="art-background">
      <div className="art-inner">
        <div className="top-inn">
          <div className="left-art">
            <h3>Finding the goodness of owning a pet</h3>
            <h1>
              Nothing compares to the joy of coming home to a loyal
              companion.
            </h1>
            <button>Get Started</button>
          </div>
          <div className="right-art">
            <img src="/images/subimg.png" alt="img" />
          </div>
        </div>
        <div className='low-inn'>
          <p>
            The unconditional love of a pet can do more than keep you company.
            Pets may also decrease stress, improve heart health, and even help
            children with their emotional and social skills.
          </p>
          <button>Learn More</button>
        </div>
      </div>
    </div>;
}

export default article
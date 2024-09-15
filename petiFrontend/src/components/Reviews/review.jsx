import React, { useState, useEffect } from "react";
import { data as mockData } from "../../mocks/referrals";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Reviews/reviews.css";

function Review() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 2 }
      },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    setReviews(mockData);
  };

  return <div className="review-background">
      <div className="review-top">
        <div className="top-stars">
          <img src="/images/stars.png" alt="Logo" />
        </div>
        <h1>What Our Users Are Saying</h1>
      </div>
      <Slider {...settings}>
        {mockData.map(data => <div className="tests">
            <h2>
              {data.name}
            </h2>
            <p>
              {data.description}
            </p>
            <div className="min-review">
              <div className="test-img-wrap">
                <img src={data.img} />
              </div>
              <div className="review">
                <p>
                  {data.reviewer}
                </p>
                <div className="sub-rev">
                  {data.title}
                </div>
              </div>
            </div>
          </div>)}
      </Slider>
    </div>;
}

export default Review;

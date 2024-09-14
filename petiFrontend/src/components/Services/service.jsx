import React, { useState, useEffect } from "react";
import { data as mockData } from "../../mocks/offers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Services/service.css";

function Service() {

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1190,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1175,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 800,
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

const [offers, setOffers] = useState([]);

useEffect(() => {
  getOffers();
}, []);

const getOffers = async () => {
  setOffers(mockData);
};


  return <div className="service-background">
      <div className="service-inner">
        <div className="service-head">
          <p>what we offer</p>
          <h1>Our Services</h1>
          <h3>
            Welcome to petiverse, where we specialize in connecting pet
            owners, lovers and keepers globally
          </h3>
        </div>
        <Slider {...settings}>
          {mockData.map(data => <div className="items">
              <div className="img-wrap">
                <img src={data.img} alt={data.title} />
              </div>
              <div className="low">
                <h1>
                  {data.name}
                </h1>
                <p className="p-des">
                  {data.description}
                </p>
                <div className="ex-btn">
                  {data.para}
                </div>
              </div>
            </div>)}
        </Slider>
      </div>
    </div>;
}

export default Service
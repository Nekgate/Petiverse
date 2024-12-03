import React from "react";
import Nav from "../components/landing/Nav/nav";
import Hero from "../components/landing/Hero/hero";
import Mid from "../components/landing/Mid/mid";
import Service from "../components/landing/Services/service";
import Article from "../components/landing/Articles/article";
import About from "../components/landing/About/about";
import Ads from "../components/landing/Ads/ads";
import Review from "../components/landing/Reviews/review";
import Footer from "../components/landing/Footer/footer";

function Landing() {
  return <div className="App">
      <Nav />
      <div id="section-one">
        <Hero />
      </div>
      <div id="section-two">
        <Mid />
      </div>
      <div id="section-three">
        <Service />
      </div>
      <div id="section-four">
        <Article />
      </div>
      <div id="section-five">
        <About />
      </div>
      <div id="section-six">
        <Ads />
      </div>
      <div id="section-seven">
        <Review />
      </div>
      <div id="section-eight">
        <Footer />
      </div>
    </div>;
}

export default Landing;

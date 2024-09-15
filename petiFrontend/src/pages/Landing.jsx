import React from 'react';
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
      <Hero />
      <Mid />
      <Service />
      <Article />
      <About />
      <Ads />
      <Review />
      <Footer />
    </div>;
}

export default Landing
import React from 'react';
import Nav from "./components/Nav/nav";
import Hero from "./components/Hero/hero";
import Mid from "./components/Mid/mid";
import Service from "./components/Services/service";
import Article from "./components/Articles/article";
import About from "./components/About/about";
import Ads from "./components/Ads/ads";
import Review from "./components/Reviews/review";
import Footer from "./components/Footer/footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Hero />
      <Mid />
      <Service />
      <Article />
      <About />
      <Ads />
      <Review />
      <Footer />
    </div>
  );
}

export default App;

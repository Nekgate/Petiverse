import React from 'react';
import "../../pages/dashboard/dashboard.css";
import Nav from "../../components/dashboard/nav/Nav";
import SideBar from '../../components/dashboard/sideBar/SideBar';
import SearchPost from  "../../components/dashboard/searchPost/SearchPost";
import Advert from "../../components/dashboard/advertisement/Advert";
import SubNav from "../../components/dashboard/subNav/SubNav";
import Home from "../../components/dashboard/posts/home/Home";

function dashboard() {
  return <div className="main-dash">
      <Nav />
      <div className="dash-grid">
        <SideBar />
        <div className='dash-mid-post'>
          <SearchPost />
          <SubNav />
          <Home />
        </div>
        <div className="dash-ad">
          <Advert />
        </div>
      </div>
    </div>;
}

export default dashboard
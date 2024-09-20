import React from 'react';
import "../../pages/dashboard/dashboard.css";
import Nav from "../../components/dashboard/nav/Nav";
import SideBar from '../../components/dashboard/sideBar/SideBar';
import SearchPost from  "../../components/dashboard/searchPost/SearchPost";
import Advert from "../../components/dashboard/advertisement/Advert";

function dashboard() {
  return (
    <div className='main-dash'>
      <Nav />
      <div className="dash-grid">
        <SideBar />
        <SearchPost />
        <div className='dash-ad'>
          <Advert />
        </div>
      </div>
    </div>
  )
}

export default dashboard
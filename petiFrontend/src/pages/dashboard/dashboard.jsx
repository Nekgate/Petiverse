import React from 'react';
import "../../pages/dashboard/dashboard.css";
import Nav from "../../components/dashboard/nav/Nav";
import SideBar from '../../components/dashboard/sideBar/SideBar';

function dashboard() {
  return (
    <div className='main-dash'>
      <Nav />
      <div className="dash-grid">
        <SideBar />
      </div>
    </div>
  )
}

export default dashboard
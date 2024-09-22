import React, { useState, useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { data as mockData } from "../../../../mocks/home";
import "../../../../components/dashboard/posts/home/Home.css";
import { FiMoreVertical } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setPosts(mockData);
  };

  return <div className="home-background">
      <div className="home-inner">
        <div className="home-top">
          <div className="left-wing">
            <h2>Updated</h2>
            <FiChevronDown className="icon-home" />
          </div>
          <div className="right-wing">
            <p>sort by</p>
            <RiExpandUpDownLine />
          </div>
        </div>
        {mockData.map(data => <div className="home-posts">
            <div className="post-top">
              <div className="post-top-left">
                <div className="pro-img">
                  <img src={data.imgpro} alt="profile-pic" />
                </div>
                <div className="name-date">
                  <h2>
                    {data.name}
                  </h2>
                  <p>
                    {data.date}
                  </p>
                </div>
              </div>
              <div className="post-side-icons">
                <FiMoreVertical />
                <FiX />
              </div>
            </div>
            <div className="posts-mid">
              <p>
                {data.description}
              </p>
              <div className="post-mainpic">
                <img src={data.imgMain} alt="profile-pic" />
              </div>
              <div className="sub-reactions">
                <div className="react">
                  <FaHeart className="fa-con"/>
                  <p>
                    {data.react}
                  </p>
                </div>
                <div className="right-react">
                  <div className="comm">
                    <p>
                      {data.comment}
                    </p>
                  </div>
                  <div className="shares">
                    <p>
                      {data.shares}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="all-reactions">
                <ul>
                  <li>
                    <FaThumbsUp />Like
                  </li>
                  <li>
                    <AiFillMessage />Comment
                  </li>
                  <li>
                    <BiRepost />Repost
                  </li>
                  <li>
                    <IoMdShare />Share
                  </li>
                </ul>
              </div>
              <hr />
            </div>
          </div>)}
      </div>
    </div>;
}

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";
const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    if (input.trim() === "") return;
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="/img/search.png" alt="Search" />
              <input
                type="text"
                placeholder='Try "building mobile app" '
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
              />
            </div>
            <button onClick={searchHandler}>Search</button>
          </div>
          <div className="popular">
            <span>Popular: </span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="/img/man.png" alt="Man" />
        </div>
      </div>
    </div>
  );
};

export default Featured;

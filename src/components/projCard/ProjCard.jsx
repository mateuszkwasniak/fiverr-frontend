import React from "react";
import "./ProjCard.scss";

import { Link } from "react-router-dom";

const ProjCard = ({ item }) => {
  return (
    <Link to="">
      <div className="projcard">
        <div className="top">
          <img src={item.img} alt="Card" />
        </div>
        <div className="bottom">
          <img src={item.pp} alt="user"></img>
          <div className="details">
            <span className="category">{item.cat}</span>
            <span className="by">by {item.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjCard;

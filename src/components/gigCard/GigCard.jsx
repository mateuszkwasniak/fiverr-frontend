import React from "react";
import "./Gigcard.scss";

import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/${item._id}`}>
      <div className="gigcard">
        <img src={item.cover} alt="gig" />
        <div className="info">
          <div className="user">
            <img
              src={item.owner?.profilePic || "./img/noavatar.jpg"}
              alt="user"
            />
            <span>{item.owner.username}</span>
          </div>
          <p className="desc">
            {item.shortDescription.length > 60
              ? item.shortDescription.slice(0, 60) + "..."
              : item.shortDescription}
          </p>
          <div className="star">
            <img src="./img/star.png" alt="star" />
            <span>{Math.round(item.totalStars / item.starNumber) || 0}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./img/heart.png" alt="heart" />
          <div className="price">
            <span>STARTING AT</span>
            <h3>${item.price}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;

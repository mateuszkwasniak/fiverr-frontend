import React from "react";
import "./Review.scss";

const Review = ({ review }) => {
  return (
    <div className="review">
      <div className="user">
        <img
          className="pp"
          alt="profile"
          src={review.user?.profilPic || "/img/noavatar.jpg"}
        />
        <div className="info">
          <span className="username">{review.user.username}</span>
          <span className="country">{review.user.country}</span>
        </div>
      </div>
      <div className="stars">
        {[...Array(review.star)].map((_, idx) => (
          <img src="/img/star.png" alt="star" key={idx} />
        ))}
        <span>{review.star}</span>
      </div>
      <p>{review.description}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="like" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="dislike" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;

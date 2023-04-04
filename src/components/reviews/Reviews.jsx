import React, { useState, useEffect, useRef } from "react";
import Review from "../review/Review";
import { useMutation } from "@tanstack/react-query";
import "./Reviews.scss";

const Reviews = ({ reviews, gigId, refetch }) => {
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const mutation = useMutation({
    mutationFn: (review) => {
      setError(null);
      return fetch("https://fiverr-backend-xke3.onrender.com/api/review", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
    },

    onError: () => {
      setError("Something went wrong, please try commenting later.");
      inputRef.current.value = "";
    },

    onSuccess: async (response) => {
      inputRef.current.value = "";
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
      } else {
        refetch();
      }
    },
  });

  useEffect(() => {
    let disappear;

    if (error) {
      disappear = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => clearTimeout(disappear);
  }, [error]);

  const submitFromHandler = (e) => {
    e.preventDefault();
    const description = e.target[0].value;
    const star = e.target[1].value;

    if (description === "" || star === undefined) {
      return;
    }

    mutation.mutateAsync({ description, star, gigId });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {reviews.length > 0 &&
        reviews.map((rev) => (
          <div key={rev._id}>
            <Review review={rev} />
            <hr />
          </div>
        ))}
      <div className="add">
        <h3>Add a review</h3>
        <form onSubmit={submitFromHandler}>
          <input type="text" placeholder="Your opinion" ref={inputRef} />
          <div className="wrap">
            {error && <span className="error">{error}</span>}
            <select>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;

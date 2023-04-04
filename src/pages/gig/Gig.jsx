import Carousel from "react-multi-carousel";
import Reviews from "../../components/reviews/Reviews";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect } from "react";
import "./Gig.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Gig = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigData"],
    queryFn: async () => {
      const response = await fetch(
        `https://fiverr-backend-xke3.onrender.com/api/gig/single/${id}`
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      return await response.json();
    },
  });

  return (
    <div className="gig">
      <div className="container">
        {isLoading && "Loading..."}
        {error && "Something went wrong..."}
        {data && (
          <>
            <div className="left">
              <span className="breadcrumbs">
                FIVERR &gt; {data.gig.category.toUpperCase()}
              </span>
              <h1>{data.gig.title}</h1>
              <div className="user">
                <img
                  className="pp"
                  src={data.gig.owner?.profilePic || "/img/noavatar.jpg"}
                  alt="user"
                />
                <span>{data.gig.owner.username}</span>
                <div className="stars">
                  {!isNaN(data.gig.totalStars / data.gig.starNumber) &&
                    [
                      ...Array(
                        Math.round(data.gig.totalStars / data.gig.starNumber)
                      ),
                    ].map((_, idx) => (
                      <img src="/img/star.png" alt="star" key={idx} />
                    ))}
                  <span>
                    {Math.round(data.gig.totalStars / data.gig.starNumber) ||
                      ""}
                  </span>
                </div>
              </div>
              {data.gig?.images && (
                <Carousel
                  responsive={responsive}
                  className="carousel"
                  infinite={true}
                >
                  {data.gig.images.map((url) => (
                    <div key={url}>
                      <img src={url} alt="work" />
                    </div>
                  ))}
                </Carousel>
              )}

              <h2>About This Gig</h2>
              <p>{data.gig.description}</p>

              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img
                    src={data.gig.owner?.profilePic || "/img/noavatar.jpg"}
                    alt="user"
                  />
                  <div className="info">
                    <span>{data.gig.owner.username}</span>
                    <div className="stars">
                      {!isNaN(data.gig.totalStars / data.gig.starNumber) &&
                        [
                          ...Array(
                            Math.round(
                              data.gig.totalStars / data.gig.starNumber
                            )
                          ),
                        ].map((_, idx) => (
                          <img src="/img/star.png" alt="star" key={idx} />
                        ))}
                      <span>
                        {Math.round(
                          data.gig.totalStars / data.gig.starNumber
                        ) || ""}
                      </span>
                    </div>
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{data.gig.owner.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">
                        {new Date(data.gig.owner.createdAt).toLocaleDateString(
                          "en-gb",
                          { year: "numeric", month: "long" }
                        )}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                  </div>
                  <hr />
                  <p>{data.gig.owner?.description}</p>
                </div>
              </div>
              <Reviews
                reviews={data.gig.reviews}
                gigId={data.gig._id}
                refetch={refetch}
              />
            </div>
            <div className="right">
              <div className="rightBox">
                <div className="product">
                  <h3>{data.gig.title}</h3>
                  <span>$ {data.gig.price}</span>
                </div>
                <p>{data.gig.shortDescription}</p>
                <div className="time">
                  <div className="item">
                    <img src="/img/clock.png" alt="clock" />
                    <span>{data.gig.deliveryTime} days delivery</span>
                  </div>
                  <div className="item">
                    <img src="/img/recycle.png" alt="revision" />
                    <span>{data.gig.revisionNumber} revisions</span>
                  </div>
                </div>
                <div className="ticks">
                  {data.gig.features?.map((feature) => (
                    <div key={feature}>
                      <img src="/img/greencheck.png" alt="tick" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    navigate(`/payment/${id}`);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gig;

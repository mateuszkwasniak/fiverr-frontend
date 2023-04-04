import React from "react";
import "./Slide.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slide = ({ children, slidesToShow, backgroundColor }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: slidesToShow,
      slidesToSlide: slidesToShow,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: slidesToShow,
      slidesToSlide: slidesToShow,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div
      className="slide whiteArrowsBcg"
      style={backgroundColor && { backgroundColor: `${backgroundColor}` }}
    >
      <div className="container">
        <Carousel className="carousel" responsive={responsive} infinite={true}>
          {/* {cards.map((card) => (
            <CatCard key={card.id} item={card} />
          ))} */}
          {children}
        </Carousel>
      </div>
    </div>
  );
};

export default Slide;

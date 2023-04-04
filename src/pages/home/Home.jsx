import React from "react";
import Featured from "../../components/featured/Featured";
import Trusted from "../../components/trusted/Trusted";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/catCard";
import ProjCard from "../../components/projCard/ProjCard";
import "./Home.scss";

import { cards, projects } from "../../data";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <Trusted />
      <Slide slidesToShow={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <div className="title">
              <img src="./img/check.png" alt="check"></img>
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="check"></img>Quality work done
              quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="check"></img>Protected payments,
              every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="check"></img>24/7 support
            </div>
            <p>
              Questions? Our round-the-clock support team is available to help
              anytime, anywhere.
            </p>
          </div>
          <div className="item">
            <video src="./img/test_video.mp4" controls width="720"></video>
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <div className="small">
              <h2>
                <span className="bold">fiverr</span> business.
              </h2>
              <span className="label">NEW</span>
            </div>
            <h2>
              A business solution designed for <i>teams</i>
            </h2>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to business
            </p>
            <div className="title">
              <img src="./img/check.png" alt="check" />
              Connect to freelancers with proven business experience
            </div>
            <div className="title">
              <img src="./img/check.png" alt="check" />
              Get matched with the perfect talent by a customer success manager
            </div>
            <div className="title">
              <img src="./img/check.png" alt="check" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
              alt="Fellas"
            ></img>
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} backgroundColor={"#f5f5f5"}>
        {projects.map((project) => (
          <ProjCard key={project.id} item={project} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;

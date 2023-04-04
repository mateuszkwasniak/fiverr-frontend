import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="column">
            <h3>Categories</h3>
            <p>Graphics & Design</p>
            <p>Digital Marketing</p>
            <p>Writing & Translation</p>
            <p>Video & Animation</p>
            <p>Programming & Tech</p>
            <p>Data</p>
          </div>
          <div className="column">
            <h3>About</h3>
            <p>Writing & Translation</p>
            <p>Video & Animation</p>
            <p>Programming & Tech</p>
          </div>
          <div className="column">
            <h3>Support</h3>
            <p>Video & Animation</p>
            <p>Programming & Tech</p>
            <p>Data</p>
            <p>Business</p>
          </div>
          <div className="column">
            <h3>Community</h3>
            <p>Graphics & Design</p>
            <p>Digital Marketing</p>
            <p>Writing & Translation</p>
            <p>Video & Animation</p>
            <p>Programming & Tech</p>
          </div>
          <div className="column">
            <h3>More From Fiverr</h3>
            <p>Business</p>
            <p>Lifestyle</p>
            <p>Photography</p>
            <p>Sitemap</p>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <h3>fiverr</h3>
            <span>Fiverr International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/facebook.png" alt="social"></img>
              <img src="/img/twitter.png" alt="social"></img>
              <img src="/img/linkedin.png" alt="social"></img>
              <img src="/img/pinterest.png" alt="social"></img>
              <img src="/img/instagram.png" alt="social"></img>
            </div>
            <div className="link">
              <img src="/img/language.png" alt="language"></img>
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="coin"></img>
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="fella"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

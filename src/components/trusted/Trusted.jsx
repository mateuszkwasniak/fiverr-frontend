import React from "react";
import "./Trusted.scss";

const Trusted = () => {
  return (
    <div className="trusted">
      <div className="container">
        <span>Trusted by</span>
        <span className="company">Facebook</span>
        <span className="company">Google</span>
        <span className="company">Netflix</span>
        <span className="company">P&G</span>
        <span className="company">PayPal</span>
      </div>
    </div>
  );
};

export default Trusted;

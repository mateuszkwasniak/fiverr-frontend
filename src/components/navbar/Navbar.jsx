import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { pathname } = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 50) {
        setActive(true);
      } else setActive(false);
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://fiverr-backend-xke3.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const details = await response.json();

      if (!response.ok) {
      } else {
        localStorage.removeItem("currentUser");
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className={`navbar ${active || pathname !== "/" ? "active" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="text">fiverr</span>
            <span className="dot">.</span>
          </Link>
        </div>

        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (
            <Link to="/login">
              <span>Sign in</span>
            </Link>
          )}
          {!currentUser && (
            <Link to="/register">
              <button
                className={`${active || pathname !== "/" ? "onWhite" : ""}`}
              >
                Join
              </button>
            </Link>
          )}
          {currentUser && (
            <div
              className="user"
              onClick={() => {
                setShowUserMenu((prev) => !prev);
              }}
            >
              <img
                src={currentUser?.profilePic || "/img/noavatar.jpg"}
                alt="profile"
              />

              <span>{currentUser?.username}</span>
              {showUserMenu && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs">Gigs</Link>
                      <Link to="/add">Add New Gig</Link>
                    </>
                  )}
                  <Link to="/orders">Orders</Link>
                  <Link to="/messages">Messages</Link>
                  <span onClick={handleLogout}>Logout</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link to="/">Graphics & Design</Link>
            <Link to="/">Video & Animation</Link>
            <Link to="/">Writing & Translation</Link>
            <Link to="/">AI Services</Link>
            <Link to="/">Digital Marketing</Link>
            <Link to="/">Music & Audio</Link>
            <Link to="/">Programming & Tech</Link>
            <Link to="/">Business</Link>
            <Link to="/">Lifestyle</Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;

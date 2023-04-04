import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import "./Register.scss";

const initInputs = {
  username: "",
  email: "",
  password: "",
  profilePic: "",
  country: "",
  phone: "",
  description: "",
  isSeller: false,
};

const Spinner = () => {
  return <div className="spinner" />;
};

const Register = () => {
  const [user, setUser] = useState(initInputs);
  const [error, setError] = useState(null);
  const [invalidInputs, setInvalidInputs] = useState([]);
  const [loading, setLoading] = useState(false);

  const profilePicInputRef = useRef();
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const invalidFieldFocusHandler = (name) => {
    setInvalidInputs((prev) => prev.filter((invalid) => invalid !== name));
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setInvalidInputs([]);
    setLoading(false);

    const required = ["username", "email", "password", "country"];
    const filtered = Object.entries(user).filter((entry) => {
      return required.includes(entry[0]) && entry[1] === "";
    });

    const empty = filtered.flat().filter((el) => el !== "");
    if (empty.length !== 0) {
      setInvalidInputs(empty);
      setError("Please fill out the required fields.");
      return;
    }

    if (!validator.isEmail(user.email)) {
      setInvalidInputs(["email"]);
      setError("Please enter a proper email address.");
      return;
    }

    if (user.password.length < 6) {
      setInvalidInputs(["password"]);
      setError("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(user).forEach((entry) => {
        formData.append(entry[0], entry[1]);
      });

      const response = await fetch(
        "https://fiverr-backend-xke3.onrender.com/api/auth/register",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      } else {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        setUser(initInputs);
        profilePicInputRef.current.value = null;
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <form onSubmit={formHandler}>
        <div className="left">
          <h2>Create a new account</h2>
          <label>
            Username <span>*</span>
          </label>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={inputChangeHandler}
            onFocus={() => invalidFieldFocusHandler("username")}
            className={invalidInputs.includes("username") ? "invalid" : ""}
            value={user.username}
          />
          <label>
            Email <span>*</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={inputChangeHandler}
            onFocus={() => invalidFieldFocusHandler("email")}
            className={invalidInputs.includes("email") ? "invalid" : ""}
            value={user.email}
          />
          <label>
            Password <span>*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password (at lest 6 characters long)"
            onChange={inputChangeHandler}
            onFocus={() => invalidFieldFocusHandler("password")}
            className={invalidInputs.includes("password") ? "invalid" : ""}
            value={user.password}
          />
          <label>Profile Picture</label>
          <div className="profileWrap">
            <input
              ref={profilePicInputRef}
              type="file"
              name="profilePic"
              onChange={(e) => {
                setUser((prev) => {
                  return { ...prev, profilePic: e.target.files[0] };
                });
              }}
            />
            {profilePicInputRef?.current?.files?.length > 0 && (
              <span
                onClick={() => {
                  setUser((prev) => {
                    return { ...prev, profilePic: "" };
                  });
                  profilePicInputRef.current.value = null;
                }}
              >
                Clear [X]
              </span>
            )}
          </div>

          <label>
            Country <span>*</span>
          </label>
          <input
            type="text"
            placeholder="country"
            name="country"
            onChange={inputChangeHandler}
            onFocus={() => invalidFieldFocusHandler("country")}
            className={invalidInputs.includes("country") ? "invalid" : ""}
            value={user.country}
          />
          <button type="submit">{loading ? <Spinner /> : "Register"}</button>
          {error && <span className="error">{error}</span>}
        </div>
        <div className="right">
          <h2>I want to become a seller</h2>
          <label>
            <div className="wrapper">
              <label>Activate the seller account</label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setUser((prev) => {
                    return { ...prev, isSeller: e.target.checked };
                  });
                }}
                checked={user.isSeller}
              />
              <div className="slider" />
            </div>
          </label>
          <div className="container">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+1 234 567 89"
              onChange={inputChangeHandler}
              value={user.phone}
            />
          </div>
          <div className="container">
            <label>Description</label>
            <textarea
              cols={30}
              rows={10}
              name="description"
              placeholder="A short description of yourself"
              onChange={inputChangeHandler}
              value={user.description}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

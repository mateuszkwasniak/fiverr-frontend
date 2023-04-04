import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Spinner = () => {
  return <div className="spinner" />;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setError("Please fill out both fields.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        "https://fiverr-backend-xke3.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setLoading(false);
        setError(data.error);
      } else {
        const data = await response.json();
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label>Username</label>
        <input
          name="username"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{loading ? <Spinner /> : "Login"}</button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};

export default Login;

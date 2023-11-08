import React, { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import { CircularProgress } from "@mui/material";
function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await newRequest.post("auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
      console.log(res.data);
    } catch (err) {
      // handling error
      setError(err.response.data);
      console.log(err.response.data);
    }
    setIsLoading(false);
  };
  return (
    <div className="login">
      <div className="container">
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress
                className="progressBar"
                size={20}
                color="inherit"
              />
            ) : (
              "Login"
            )}
          </button>
          <span className="error">{error && error}</span>
        </form>

        <hr />
        <span>
          Don't have any account?{" "}
          <Link className="link-go" to="/register">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}

export default login;

import React, { useState } from "react";
import "./Featured.scss";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/categories?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1 className="title">
            <span className="newFontStart">F</span>ind The Best{" "}
            <span className="newFont">Developer</span> and best
            <span className="newFont"> Freelancer</span> from ReSeller.{" "}
          </h1>
          <div className="search">
            <div className="searchInput">
              <SearchIcon className="SearchIcon" />
              <input
                type="text"
                placeholder="Find a Service"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search..</button>
          </div>
          <div className="category">
            <span>People Likes: </span>
            <Link to="/categories?design">
              <button>Web Design</button>
            </Link>
            <Link to="/categories?development">
              <button>Software Design</button>
            </Link>
            <Link to="/categories?software">
              <button>Wordpress</button>
            </Link>
            <button>Mobile App</button>
            <Link to="/categories?animation">
              <button>Logo Design</button>
            </Link>
            <Link to="/categories?design">
              <button>AI Services</button>
            </Link>
            <Link to="/categories?music">
              <button>Music</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <img src="../../../public/img/img2.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;

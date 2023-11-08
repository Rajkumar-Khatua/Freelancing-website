import React from "react";
import "./ProjectCard.scss";
import { Link } from "react-router-dom";
function ProjectCard({ item }) {
  return (
    <Link to="/" className="link">
      <div className="projectCard">
        <img src={item.img} alt="title img" />

        <div className="info">
          <img src={item.pp} alt="profile pic" />

          <div className="texts">
            <h2> {item.cat} </h2>
            <span>{item.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;

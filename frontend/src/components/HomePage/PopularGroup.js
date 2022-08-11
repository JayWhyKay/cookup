import React from "react";
import "./PopularGroup.css";
import { Link } from "react-router-dom";

function PopularGroup({ name, about, preview, id }) {
  return (
    <Link to={`/groups/${id}`} className="popular_groups__container">
      <div>
        <img src={preview} alt="Tech Group" />
        <h3>{name}</h3>
      </div>
      <div>
        <p>{about}</p>
      </div>
    </Link>
  );
}

export default PopularGroup;

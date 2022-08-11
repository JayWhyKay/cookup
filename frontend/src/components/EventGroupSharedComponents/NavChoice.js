import React from "react";
import { NavLink } from "react-router-dom";
import "./NavChoice.css";
import NavSort from "./NavSort";

function NavChoice({ displaySort, isEvent }) {
  return (
    <div className="nav_choice__container">
      <div>
        <NavLink
          className="nav_choice__link"
          activeClassName="selected"
          to={"/groups"}
        >
          Groups
        </NavLink>
        <NavLink
          className="nav_choice__link"
          activeClassName="selected"
          to={"/events"}
        >
          Events
        </NavLink>
      </div>
      <span>Suggested {isEvent ? "events" : "groups"} </span>
      {displaySort && <NavSort />}
    </div>
  );
}

export default NavChoice;

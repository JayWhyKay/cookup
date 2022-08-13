import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "../HomePageNavigation/ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [searchName, setSearchName] = useState();

  async function handleSearch(e) {
    e.preventDefault();
    let searchInput = searchName;
    setSearchName("");
    history.push(`/events?name=${searchInput}`);
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="session-links-logged-in">
        <ProfileButton user={sessionUser} classStyle="profile-button" />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup" className="home_navigation__sign-up">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div className="nav__bar">
      <div onClick={() => history.push("/")}>CookUp</div>
      <form onSubmit={handleSearch}>
        <input
          className="nav_search__input"
          type="text"
          placeholder="Search for events (case-sensitive)"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div>{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;

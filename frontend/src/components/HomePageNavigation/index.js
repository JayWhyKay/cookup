import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import DemoLoginButton from "./DemoLogin";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <DemoLoginButton />
        <LoginFormModal />
        <Link to="/signup" className="home_navigation__sign-up">
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <div className="home_navigation">
      <Link to="/" className="cook_up__logo">
        CookUp
      </Link>

      <ul>
        <li>{isLoaded && sessionLinks}</li>
      </ul>
    </div>
  );
}

export default Navigation;

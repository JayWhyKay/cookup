import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profile_button__container">
      <div onClick={openMenu}>
        {showMenu === false ? (
          <i className="fa-solid fa-caret-down fa-xl"></i>
        ) : (
          <i className="fa-solid fa-caret-up fa-xl"></i>
        )}
        <button>{user.firstName[0]}</button>
      </div>
      {showMenu && (
        <div className="profile_button__dropdown">
          <div
            onClick={() => history.push("/profile")}
          >
            Your Profile
          </div>
          <div
            onClick={() => history.push("/create-group")}
          >
            Create a Group
          </div>
          <div onClick={logout}>Log Out</div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;

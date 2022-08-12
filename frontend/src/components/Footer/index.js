import React from "react";
import "./Footer.css";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import FooterColumn from "./FooterColumn";
import LoginFormModal from "../LoginFormModal";

function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  return (
    <div className="footer__container">
      <div>
        <p>
          Get started on <span>CookUp</span>.
        </p>
        {!sessionUser && (
          <div
            onClick={() => history.push("/signup")}
            className="footer__signup"
          >
            Sign Up
          </div>
        )}
      </div>

      <div className="footer_body__container">
        <div>
          <span>Your Account</span>
          {!sessionUser && (
            <Link to="/signup" className="footer_account__links">
              Sign up
            </Link>
          )}
          {!sessionUser && <LoginFormModal />}
          {sessionUser && (
            <div className="footer_account__links" onClick={logout}>
              Log Out
            </div>
          )}
        </div>
        <FooterColumn
          title={"Discover"}
          categories={[
            { name: "Groups", link: "groups" },
            { name: "Events", link: "events" },
          ]}
        />
        <div>
          <span>Tech Used</span>
          <a href="https://reactjs.org/">
            <i class="devicon-react-original colored"></i>
            {` `}React
          </a>
          <a href="https://redux.js.org/">
            <i className="devicon-redux-original colored"></i>
            {` `}Redux
          </a>
          <a href="https://expressjs.com/">
            <i class="devicon-express-original"></i>
            {` `}Express
          </a>
          <a href="https://sequelize.org/">
            <i class="devicon-sequelize-plain colored"></i>
            {` `}Sequelize
          </a>
          <a href="https://www.javascript.com/">
            <i class="devicon-javascript-plain colored"></i>
            {` `}JavaScript
          </a>
        </div>
      </div>
      <div className="personal__links">
        <span>Links to developer</span>
        <div className="footer-social-links">
          <a href="https://www.linkedin.com/in/james-kim-b48a47167">
            <i className="fa-brands fa-linkedin fa-2xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/james-kim-b48a47167">
            <i className="fa-brands fa-angellist fa-2xl"></i>
          </a>
          <a href="https://github.com/JayWhyKay">
            <i className="fa-brands fa-github fa-2xl"></i>
          </a>
          <a href="https://github.com/JayWhyKay">
            <i className="fa-solid fa-image-portrait fa-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

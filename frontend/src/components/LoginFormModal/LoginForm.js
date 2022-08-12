import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors([data.message]);
      }
    );
  };

  function handleDemo() {
    return dispatch(
      sessionActions.login({ email: "demo@user.io", password: "password" })
    );
  }


  return (
    <form onSubmit={handleSubmit} className="login_form">
      <h1>CookUp</h1>
      <h2>Log in</h2>
      <div>
        <span>Not a member?</span>
        <Link to="/signup">
          Sign up
        </Link>
      </div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">
        Log In
      </button>
      <button onClick={(e)=> handleDemo()}>
        Demo User
      </button>
    </form>
  );
}

export default LoginForm;

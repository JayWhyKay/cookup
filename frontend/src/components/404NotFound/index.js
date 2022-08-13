import React from "react";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="error_container">
      <h1>404</h1>
      <h3>Not Found</h3>
      <h4>Resource could not be found. Please check url.</h4>
    </div>
  );
}

export default NotFoundPage;

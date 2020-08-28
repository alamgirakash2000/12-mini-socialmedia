import React from "react";
import "./ErrorPage.style.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="text-center mt-5">
      <h1>404 Not fond this page</h1>
      <Link className="btn-lg btn-info mt-5" to="/">
        Go Home
      </Link>
    </div>
  );
}

export default ErrorPage;

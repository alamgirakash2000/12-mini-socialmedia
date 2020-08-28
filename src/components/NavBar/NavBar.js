import React from "react";
import "./NavBar.style.css";
import { NavLink, Link } from "react-router-dom";

import { useStateValue } from "../../ContextApi/StateProvider";
import { auth } from "../../firebase/Config";

function NavBar() {
  const [{ user }, dispatch] = useStateValue();

  const logout = async () => {
    localStorage.removeItem("socialsite_user");
    if (user) {
      await auth.signOut();
    }
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <nav className="navbar d-flex justify-content-around position-sticky sticky-top">
      <NavLink exact to="/" className="navLink" activeClassName="selected">
        <i class="fas fa-server fa-2x"></i>
      </NavLink>
      <NavLink to="/profile" className="navLink" activeClassName="selected">
        <i class="fas fa-user-circle fa-2x"></i>
      </NavLink>
      <div className="navLink" activeClassName="selected">
        <div className={`${user ? "d-none" : "d-flex"}`}>
          <Link to="/login" className="navLink btn btn-success mx-3">
            Login
          </Link>
          <Link to="/signup" className="navLink btn btn-info  mx-3">
            Resister
          </Link>
        </div>
        <div
          className={`${user ? "btn btn-danger" : "d-none btn btn-danger"}`}
          onClick={logout}
        >
          <Link className="navLink">Log Out</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

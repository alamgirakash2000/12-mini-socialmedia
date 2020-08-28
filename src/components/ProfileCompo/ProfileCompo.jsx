import React from "react";
import "./Profile.style.css";
import { Link } from "react-router-dom";

import { useStateValue } from "../../ContextApi/StateProvider";

function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const maleAvatar =
    "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg";
  const femaleAvatar =
    "https://img.pngio.com/avatar-female-person-profile-user-website-woman-icon-female-profile-png-512_512.png";
  return (
    <div id="profile w-100">
      <div className="text-center">
        {user ? (
          <h3 className="text-dark">User Info</h3>
        ) : (
          <h4 className="text-dark"> Please login to see you info</h4>
        )}
      </div>
      <div className="mx-auto d-flex justify-content-center">
        <img className="user__image" src={user?.URL || maleAvatar} />
      </div>
      <h5>{user?.description}</h5>
      <div className="table-responsive">
        <table className="table table-striped my-4">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Username</td>
              <td>{user?.name || ""}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user?.email || ""}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{user?.phoneNumber || ""}</td>
            </tr>

            <tr>
              <td>Password</td>
              <td>{user?.password || ""}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <Link
          to="/editprofile"
          className={`btn btn-primary ${!user && "d-none"}`}
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default Profile;

import "./SignUp.style.css";
import React, { useState } from "react";
import { auth, database } from "../../firebase/Config";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "../../ContextApi/StateProvider";

export default function SignUp(props) {
  const [{ user }, dispatch] = useStateValue();
  const [email, setEmail] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const nullify = () => {
    setEmail(null);
    setName("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      e.target.elements.password.value !==
      e.target.elements.confirmPassword.value
    ) {
      alert("Confirm Password and Password must be the same");
      return;
    }
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          database
            .collection("users")
            .add({
              name,
              id: result.user.uid,
              email,
              password,
              URL: "",
              description: "",
            })
            .then((docRef) => {
              dispatch({
                type: "SET_USER",
                user: {
                  name,
                  id: result.user.uid,
                  email,
                  password,
                  URL: "",
                  description: "",
                },
              });
              localStorage.setItem(
                "socialsite_user",
                JSON.stringify({
                  name,
                  id: result.user.uid,
                  email,
                  password,
                  URL: "",
                  description: "",
                })
              );
              nullify();
              props.history.push("/");
            })
            .catch((error) => {
              console.log("Error while signing up", error);
            });
        });
    } catch (error) {
      document.getElementById("1").innerHTML =
        "Error while signing up. Please try again";
    }
  };

  return (
    <div className="login-form">
      <div className="">
        <div className="text-center mx-auto">
          <div className="signup-header py-4">
            <h3>Welcome to Sign Up page</h3>
            <h5 className="mb-4">
              You can use all the features of this app by signing up
            </h5>
            <Link to="/" className="my-4 home-button btn-lg btn-success">
              Go back to Home
            </Link>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="py-3 mx-auto col-md-7 col-11 signin-from"
          >
            <TextField
              id="standard-basic"
              className="form-control mb-3"
              name="displayName"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              label="Name"
            />
            <TextField
              id="standard-basic"
              className="form-control mb-3"
              name="email"
              type="email"
              required
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="standard-basic"
              className="form-control mb-3"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              label="Password (At least 6 digits or characters)"
            />
            <TextField
              id="standard-basic"
              className="form-control mb-3"
              name="confirmPassword"
              type="password"
              required
              label="Confirm Password"
            />

            <p className="text-danger" id="1"></p>
            <button type="submit" className="signup-button sign px-4">
              <h5 className="text-center">SIGN UP</h5>
            </button>
            <div>
              <p>
                Already have a account?{" "}
                <Link to="/login" className="text-primary mx-2">
                  Sign In
                </Link>
                here.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

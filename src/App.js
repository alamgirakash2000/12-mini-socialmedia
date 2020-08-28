import React, { useEffect, useState } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./ContextApi/StateProvider";

import NavBar from "./components/NavBar/NavBar";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import CreatePost from "./pages/CreatePost/CreatePost";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { database } from "./firebase/Config";

function App() {
  const [{ posts, user }, dispatch] = useStateValue();
  const [psts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPosts() {
      await database
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });
    }
    getPosts();
    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch({
      type: "SET_POSTS",
      item: psts,
    });
  }, [psts]);

  useEffect(() => {
    dispatch({
      type: "SET_USER",
      user: JSON.parse(localStorage.getItem("socialsite_user")),
    });
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/createpost" component={CreatePost} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;

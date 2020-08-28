import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { database } from "../../firebase/Config";
import "./Home.css";
import { Link } from "react-router-dom";

import { useStateValue } from "../../ContextApi/StateProvider";

import Post from "../../components/post/Post";
import Profile from "../../components/ProfileCompo/ProfileCompo";

function Home() {
  const [{ posts, user }, dispatch] = useStateValue();

  return (
    <div>
      <div className="container">
        <div className="row body_container">
          {user ? (
            <Link to="createpost" className={`mb-2 mt-0 mx-auto addPost`}>
              <i class="fas fa-plus fa-3x addPost__imoji"></i>
              <h4>Add New Post</h4>
            </Link>
          ) : (
            <h6 className="p-2 my-2">
              After login or register, You will be able to create your own post,
              do react and comments on other's post.
            </h6>
          )}

          <div className="col-md-7">
            <div className="posts">
              {posts.map(({ id, post }) => (
                <Post
                  key={id}
                  postId={id}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                  timestamp={post.timestamp}
                  imageName={post.imageName}
                  react={post.react}
                  userId={`${post?.userId || ""}`}
                />
              ))}
            </div>
          </div>
          <div className="col-md-5 d-md-block d-none">
            <div className="profile">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

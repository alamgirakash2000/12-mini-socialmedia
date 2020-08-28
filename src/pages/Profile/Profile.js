import React, { useEffect } from "react";
import "./Profile.style.css";

import { useStateValue } from "../../ContextApi/StateProvider";
import Post from "../../components/post/Post";

import ProfileCompo from "../../components/ProfileCompo/ProfileCompo";

function Profile() {
  const [{ myPosts, posts, user }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "SET_MY_POST",
    });
  }, [posts]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <div className="profile">
            <ProfileCompo />
          </div>
        </div>
        <div className="col-md-7">
          <h4 className={`${user && "d-none"}`}>
            Plese Login to your posts here
          </h4>
          <div className={`posts ${!user && "d-none"}`}>
            {myPosts.map(({ id, post }) => (
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
      </div>
    </div>
  );
}

export default Profile;

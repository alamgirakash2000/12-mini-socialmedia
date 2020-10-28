import React, { useState, useEffect } from "react";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";
import ShowTime from "./showTime/showTime";
import EditPost from "../EditPost/EditPost";
import "./Post.style.css";

import Avatar from "@material-ui/core/Avatar";
import { database } from "../../firebase/Config";
import { useStateValue } from "../../ContextApi/StateProvider";

function Post({
  username,
  caption,
  imageUrl,
  imageName,
  postId,
  userId,
  timestamp,
  react,
}) {
  const [{ user }, dispatch] = useStateValue();
  const [comments, setComments] = useState([]);
  const [reacted, setReacted] = useState(react || []);
  const [comment, setComment] = useState("");
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    let unsubscriber;
    if (postId) {
      unsubscriber = database
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscriber();
    };
  }, [postId]);

  // Add new React
  const addReact = () => {
    if (user) {
      setReacted([...reacted, user.id]);
    }
  };
  // Remove react
  const removeReact = () => {
    setReacted(reacted.filter((reactId) => reactId !== user.id));
  };

  useEffect(() => {
    database.collection("posts").doc(postId).update({ react: reacted });
  }, [reacted]);

  // Add the written comment to the database
  const postComment = (e) => {
    e.preventDefault();
    database.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.name,
      userId: user.id,
      userImg: user.URL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post text-dark">
      {/*Header Section of the post*/}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={`${username}`}
          src="/static/images/avatar/1.jpg"
        />
        <div>
          <h5 className="m-0">{username}</h5>
          <ShowTime timestamp={timestamp} />
        </div>

        {/* Edit post */}
        <div className="edit__button">
          {user?.id === userId ? (
            <EditPost postId={postId} imageName={imageName} caption={caption} />
          ) : null}
        </div>
      </div>

      {/*Post Body*/}
      <div className="post_body bg-light">
        <h6 className="post__text">{caption}</h6>
        <img className="post__image" src={`${imageUrl}`} alt="Post Image" />
      </div>

      {/*Like and comment section*/}
      <div className="like_commets my-1 py-2 d-flex justify-content-between px-3">
        <div className="react">
          <button className="react_btn mr-2">
            {reacted?.includes(user?.id) ? (
              <i class="fas fa-heart fa-2x" onClick={removeReact}></i>
            ) : (
              <i className="far fa-heart fa-2x" onClick={addReact}></i>
            )}
          </button>
          <span>{reacted?.length || 0} Reacts</span>
        </div>

        <p>{comments?.length} Comments</p>
      </div>

      {/*See the comments*/}
      <div className="post__comments">
        {comments?.slice(0, 2).map((comment) => (
          <div className="comment mt-2">
            <p className="comment_text m-0">
              <strong>{comment.username} </strong>
              {comment.text}
            </p>
            <ShowTime timestamp={comment.timestamp} className="m-0" />
          </div>
        ))}
        {viewAll &&
          comments?.slice(2).map((comment) => (
            <div className="comment mt-2">
              <p className="comment m-0">
                <strong>{comment.username} </strong>
                {comment.text}
              </p>
              <ShowTime timestamp={comment.timestamp} className="m-0" />
            </div>
          ))}
        <button
          className={`btn mt-2 btn-info ${viewAll && "d-none"} ${
            comments.length <= 2 && "d-none"
          }`}
          onClick={() => {
            setViewAll(true);
          }}
        >
          view all
        </button>
        <button
          className={`btn mt-2 btn-primary ${!viewAll && "d-none"}`}
          onClick={() => {
            setViewAll(false);
          }}
        >
          view less
        </button>
      </div>

      {/*Adding comments section*/}
      {user && (
        <form className="d-flex px-2">
          <input
            className="form-control comment__input mb-3"
            type="text"
            row="1"
            value={comment}
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className={`comment__button ${!comment && "d-none"}`}
            onClick={postComment}
          >
            <SendIcon />
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;

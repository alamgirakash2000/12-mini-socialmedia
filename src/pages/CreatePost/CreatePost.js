import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { database, storage } from "../../firebase/Config";
import "./CreatePost.style.css";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "../../ContextApi/StateProvider";

function CreatePost(props) {
  const [{ user }, dispatch] = useStateValue();
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleClose = () => {
    setProgress(0);
    setCaption("");
    setImage(null);
  };

  useEffect(() => {
    console.log(image);
  }, [image]);
  function handleChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0].name);
      document.getElementById(
        "imageName"
      ).innerText = `${e.target.files[0].name}`;
    }
  }

  const handleUpload = () => {
    if (!image) {
      return;
    }
    const uploadTask = storage
      .ref(`images/${image.name + "-" + image.lastModifiedDate}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        if (progress >= 95) {
          handleClose();
        }
      },
      (error) => {
        // Error Function
        console.log(error);
      },
      () => {
        // Complete function ...
        storage
          .ref("images")
          .child(image.name + "-" + image.lastModifiedDate)
          .getDownloadURL()
          .then((url) => {
            // post image inside the database
            database.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              userId: user.id,
              username: user.name,
              imageName: image.name + "-" + image.lastModifiedDate,
              react: [],
            });
            props.history.push("/");
          });
      }
    );
  };

  return (
    <div>
      <div className="imageUpload col-md-7">
        <h3 className="my-4 mx-auto text-dark">Add a new post</h3>
        <progress
          value={progress}
          max="100"
          className="imageUpload__progress"
        />
        <TextField
          id="standard-basic"
          className="form-control mb-3"
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
          label="Enter a caption.."
        />
        <div id="imageView"></div>

        <input
          type="file"
          accept="images/*"
          onChange={handleChange}
          className="imageUpload__file mb-1"
          required
        />
        <div className="text-dark m-0" id="imageName">
          No image selected
        </div>
        <div className="d-flex justify-content-around">
          <button onClick={handleUpload} className="imageUpload__button">
            Upload
          </button>
          <Link
            to="/"
            className="text-center cancel imageUpload__button bg-dark"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

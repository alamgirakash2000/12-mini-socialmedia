import React, { useState, useEffect } from "react";
import { database } from "../../firebase/Config";
import { TextField } from "@material-ui/core";

function Edit({ postId, caption }) {
  const [newCaption, setNewCaption] = useState(caption);

  useEffect(() => {
    database
      .collection("posts")
      .doc(postId)
      .update({
        caption: newCaption,
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }, [newCaption]);

  return (
    <form className="text-center mx-auto w-100">
      <h3 className="my-4 mx-auto">Edit Caption</h3>
      <TextField
        id="standard-basic"
        className="form-control mb-3"
        type="text"
        value={newCaption}
        onChange={(e) => setNewCaption(e.target.value)}
        label="Enter a caption.."
      />
    </form>
  );
}

export default Edit;

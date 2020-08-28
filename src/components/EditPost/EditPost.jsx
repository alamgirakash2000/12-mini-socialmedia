import React from "react";
import { database, storage } from "../../firebase/Config";
import Edit from "./Edit";
import "./EditPost.style.css";

function EditPost({ postId, imageName, caption }) {
  function handleDelete() {
    // Delete the post............
    database
      .collection("posts")
      .doc(postId)
      .delete()
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    // Delete the image...............
    storage
      .ref("images")
      .child(imageName)
      .delete()
      // Delete the file
      .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log("Uh-oh, an error occurred!", error);
      });
  }

  return (
    <div class="dropdown dropleft">
      <button
        class="dropdown__button"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <h2>...</h2>
      </button>

      <div
        class="dropdown-menu"
        aria-labelledby="dropdownMenuLink"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <button
          class="dropdown-item"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <div className="d-flex justify-content-between edit text-info">
            <p>Edit</p>
            <i class="fas fa-edit"></i>
          </div>
        </button>
        <button class="dropdown-item" onClick={handleDelete}>
          <div className="d-flex justify-content-between text-danger ">
            <p>Delete</p>
            <i class="fas fa-trash-alt"></i>
          </div>
        </button>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <Edit postId={postId} caption={caption} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;

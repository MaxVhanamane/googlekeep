import React, { useContext, useRef } from "react";
import { NoteContext } from "../context/notes/NoteState";
import { AlertContext } from "./../context/AlertState";

export default function EditNote(props) {
  // useRef can be used to access a DOM element directly. You can use it to reference the element.
  // here we using this useRef hook to close the modal when user clicks on update note button.
  // as we are referencing the close button we can now programmatically click on it using its current named property.
  // refClose.current.click()
  const refClose = useRef(null);

  // getting all required states and functions from NoteContext using object destructuring.
  const { editNoteState, setEditNote, updateNote } = useContext(NoteContext);
  const { setAlert } = useContext(AlertContext);

  // creating a function to handle input values.
  function handleChange(e) {
    setEditNote({ ...editNoteState, [e.target.name]: e.target.value });
  }

  // creating a function to update note

  function handleUpdateNote(e) {
    // While updating note if user clears both title and description of existing note the note will be saved as empty to avoid that from
    // happening we will check the length of edited title and description.
    if (
      editNoteState.etitle.length !== 0 ||
      editNoteState.edescription.length !== 0
    ) {
      updateNote(
        editNoteState.id,
        editNoteState.etitle,
        editNoteState.edescription,
        editNoteState.etag
      );
      // closing the edit modal

      refClose.current.click();
    } else {
      // Show Note added alert
      setAlert((preval) => ({
        ...preval,
        severity: "warning",
        show: true,
        message: "Add title or description",
      }));
    }
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      {/* we are getting props.refValToOpenModal's value from Notes.js when user clicks on edit button we want to trigger/open this modal that's why
         we are refrencing this button.  */}
      <button
        type="button"
        ref={props.refValToOpenModal}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade mtforModal"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Enter your title"
                    onChange={handleChange}
                    value={editNoteState.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    onChange={handleChange}
                    value={editNoteState.edescription}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter tag eg. general,office,etc"
                    onChange={handleChange}
                    value={editNoteState.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleUpdateNote}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

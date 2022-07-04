import React, { useState, useContext } from 'react'
import { NoteContext } from "../context/notes/NoteState"
// to show alert when the user adds a note
import { AlertContext } from "../context/AlertState"
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import ClickAwayListener from '@mui/base/ClickAwayListener';
export default function AddNote() {
  // to display toast alert when the user adds a note.
  const AlertContextVal = useContext(AlertContext)
  const { setAlert } = AlertContextVal
  // using useContext to access required gloal variables/state
  const context = useContext(NoteContext)

  // destructuring and getting addNote function from context.
  const { addNote } = context
  const [isExpanded, setIsExpanded] = useState(false)
  // creating a state to hold input values
  const [addNoteState, setAddNote] = useState({
    "title": "",
    "description": "",
    "tag": ""
  })

  function handleExpansion() {
    setIsExpanded(true)
  }
  const handleClickAway = () => {
    setIsExpanded(false)
  };
  // creating a function to handle onChange for inputs
  function handleChange(e) {
    // { ...addNoteState, [e.target.name]: e.target.value } It will add new values in place of old values of addNoteState oject where e.target.name matches.
    // eg. if e.target.name = title then it will replace the old title value with new one and it will keep the other values as they were before.
    setAddNote({ ...addNoteState, [e.target.name]: e.target.value })
  }

  // creating a function to add a Note
  function handleAddNote(e) {
    // adding e.preventDefault() to prevent page from refreshing when we submit the form.
    e.preventDefault()

    if (addNoteState.title.length !== 0 || addNoteState.description.length !== 0) {
      // sending all the values to addNote function which we have defined in NoteState context.
      addNote(addNoteState.title, addNoteState.description, addNoteState.tag)

    }
    else {
      // Show Note added alert
      setAlert(preval => (
        {
          ...preval,
          severity: "warning",
          show: true,
          message: "Add title or description"
        }))

    }
    // clearing input fields after submitting the form
    setAddNote({
      "title": "",
      "description": "",
      "tag": ""
    })
    setIsExpanded(false)
  }

  return (
    <div className="d-flex justify-content-center container my-5">
      <ClickAwayListener onClickAway={handleClickAway}>
        <form className="add-note ">
          {isExpanded ? <input name="title" placeholder="Title" onChange={handleChange} value={addNoteState.title} autoFocus /> : null}
          <textarea name="description" placeholder="Take a note..." rows={isExpanded ? "3" : "1"} onChange={handleChange} value={addNoteState.description} onClick={handleExpansion} />
          {isExpanded && <input type="text" name="tag" placeholder="Tag (eg. general,office,etc)" onChange={handleChange} value={addNoteState.tag} />}
          {<Zoom in={isExpanded}><button onClick={handleAddNote}><AddIcon /></button></Zoom>}
        </form>
      </ClickAwayListener>
    </div>)
}

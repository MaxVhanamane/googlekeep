//The React Context API is a way for a React app to effectively produce global variables that can be passed around. 
//This is the alternative to "prop drilling" or moving props from grandparent to child to parent, and so on.

// import NoteContext from "./NoteContext"
import { createContext, useState, useContext } from "react";

import { useNavigate } from 'react-router-dom'
// to show alert when user signs up
import { AlertContext } from "../AlertState"

// creating context object and exporting it.
export const NoteContext = createContext();

// Adding all global states and functions in NoteState component.
// put all the components in app.js in <Notestate> <NoteState/> in order to use all these global states and functions in those components.
// here NoteState props will receive all those components as children. i.e props.children.

const NoteState = (props) => {
  // creating host variable to save url for simplicity.
  let host
  if (process.env.NODE_ENV === "development") {
    host = process.env.REACT_APP_DEV_HOST
  }
  else if (process.env.NODE_ENV === "production") {
    host = process.env.REACT_APP_PROD_HOST
  }


  // creating notes state to store all notes. which we will receive from db.
  const [notes, setNotes] = useState([])

  // creating userName state to display username in navbar.
  const [userName, setUserName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  // creating editNoteState for editing the notes.
  const [editNoteState, setEditNote] = useState({
    "id": "",
    "etitle": "",
    "edescription": "",
    "etag": ""
  })

  const AlertContextVal = useContext(AlertContext)
  const { setAlert } = AlertContextVal
  const navigate = useNavigate()
  // creating a function to fetch all notes.
  async function fetchAllNotes() {

    // this is how you send api request when you want to send data in headers.
    const response = await fetch(`/notes/fetchallnotes`, {
      method: 'GET',
      // sending data in headers so that I can use it in backend.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'authentication-token': localStorage.getItem("token")
      },

      // body: JSON.stringify(response) // body data type must match "Content-Type" header
    });
    const json = await response.json()

    if (json.success === false) {
      navigate("/internalservererror")
    }
    // saving all received notes in notes State. so that I can display them.
    setNotes(json)
    setSearchResults(json)

  }

  // creating a function to add a note
  async function addNote(title, description, tag) {

    const response = await fetch(`/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'authentication-token': localStorage.getItem("token")
      },

      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });

    const json = await response.json()

    if (json.success === true) {
      // Show Note added alert
      setAlert(preval => (
        {
          ...preval,
          severity: "success",
          show: true,
          message: "Note added successfully"
        }))
    }
    else {
      navigate("/internalservererror")
    }
    fetchAllNotes()
  }


  // creating a function to delete notess
  async function deleteNote(id) {
    const response = await fetch(`/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'authentication-token': localStorage.getItem("token")
      }
    });

    // filter will return all the notes where note._id !==id. i.e expect for a deleted note it will return everything.
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    const json = await response.json()
    if (json.success === true) {
      // Show Note added alert
      setAlert(preval => (
        {
          ...preval,
          severity: "success",
          show: true,
          message: "Note deleted successfully"
        }))
    }
    else {
      navigate("/internalservererror")
    }
    setNotes(newNotes)
    setSearchResults(newNotes)

  }

  // creating a function to update a note.

  async function updateNote(id, title, description, tag) {
    const response = await fetch(`/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authentication-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json = await response.json()

    // as we can not change state directly we will create a deep copy of notes object using spread operator.
    // Deep copy doesn’t reflect changes made to the new/copied object in the original object.
    const newNotes = [...notes]

    newNotes.forEach(element => {
      if (element._id === id) {
        element["title"] = title;
        element["description"] = description;
        element["tag"] = tag;
      }
    });
    setNotes(newNotes)

    if (json.success === true) {
      // Show Note added alert
      setAlert(preval => (
        {
          ...preval,
          severity: "success",
          show: true,
          message: "Note updated successfully"
        }))
    }
    else {
      navigate("/internalservererror")
    }

  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, searchResults, setSearchResults, fetchAllNotes, addNote, deleteNote, editNoteState, setEditNote, updateNote, userName, setUserName, searchTerm, setSearchTerm, host }}>
      {/* Provider will give access to all the above states and functions to the components which are in props.children */}
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;

import React, { useContext, useEffect, useRef } from 'react'
import { NoteContext } from "../context/notes/NoteState"
import NoteItems from "./NoteItems"
import AddNote from "./AddNote"
import EditNote from "./EditNote"

export default function Notes() {

  // getting all required states and function using object destructuring
  const { notes, fetchAllNotes, setEditNote, setUserName, searchResults } = useContext(NoteContext)
  // to display all notes when website loads 
  useEffect(() => {

    fetchAllNotes()
    // getting userName from local storage to display it in navbar.
    setUserName(localStorage.getItem("userName"))


    // eslint-disable-next-line
  }, [])

  // creating a reference to open edit modal when user clicks on edit icon. 
  const refToOpenEditModal = useRef(null)

  // creating a function to update note.
  const updateNote = (currentNote) => {
    // clicking on a button which opens edit modal using useref hook. The ref is defined in EditNote.
    refToOpenEditModal.current.click()
    setEditNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  return (
    <>
      <AddNote />
      <EditNote refValToOpenModal={refToOpenEditModal} />
      <div className="container w-auto my-3">
        <h2 className="text-center" >Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && <p className="text-center mt-5">There are no notes to display.</p>}
        </div>

        {searchResults.length !== 0 && <div className="container d-flex flex-wrap justify-content-center ">
          {

            searchResults.length > 0 ? searchResults.map(function (note) {


              return <NoteItems key={note._id} note={note} updateNote={updateNote} />

            }) : <h4 className=" my-4 text-center" style={searchResults.length === 0 ? { display: 'block' } : { display: 'none' }}>No match found!</h4>}
        </div>}
      </div>
    </>
  )
}

import React,{useContext} from 'react'
import {NoteContext} from "../context/notes/NoteState"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
export default function NoteItems(props) {
  const context=useContext(NoteContext)
const {deleteNote}=context
    const {note,updateNote}=props;
  // return (
  //     <div className="col-md-3 my-3">
  //   <div className="card" >
  //   <div className="card-body">
  //     <h5 className="card-title">{note.title}</h5>
  //     <p className="card-text">{note.description}</p>
  //     <div className="d-flex justify-content-end">
  //     <i className="fa-solid fa-pen mx-2 " onClick={()=>{updateNote(note)}}></i>
  //     <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>   
  //     </div>
  //   </div>
  // </div>
  // </div>
  // )
  // col-md-3 col-sm-12 col-xs-12 col-lg-2
  return (
    <div className="note break-word  " >
    <h1>{note.title}</h1>
    <p className=" break-word ">{note.description}</p>
    <button onClick={()=>{deleteNote(note._id)}}><DeleteIcon /></button>
    <button onClick={()=>{updateNote(note)}}> <EditIcon style={{ fontSize: 24 }}/> </button>
  </div>

 
  )
}

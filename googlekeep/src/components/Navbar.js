import React, { useContext, useEffect } from 'react'
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import { NoteContext } from "../context/notes/NoteState"
import ShowAlert from "./ShowAlert"
import { TokenContext } from "../context/TokenState"
import { AlertContext } from "../context/AlertState"
import LightbulbIcon from '@mui/icons-material/Lightbulb';
export default function Navbar() {

  // getting userName from NoteContext to display it in navbar.
  const { userName, setSearchTerm, setSearchResults, notes, searchTerm } = useContext(NoteContext)
  const { setAlert } = useContext(AlertContext)
  const { token, setToken } = useContext(TokenContext)
  const navigate = useNavigate()

  //  The useLocation hook returns the location object that represents the current URL.
  //  You can think about it like a useState that returns a new location whenever the URL changes.
  //  We will use it highlight current active page in navbar. we can access the path name using location.pathname
  let location = useLocation();

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    setToken(localStorage.getItem("token"))
    navigate("/login")
    setAlert(preval => (
      {
        ...preval,
        severity: "success",
        show: true,
        message: "You have been successfully logged out"
      }))
  }

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(notes)
    }

    else {

      const filterData = notes.filter(function (val) {
        if (val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
        // you have to add else statement else it will give warning in console that filter is not returning anything.
        else {
          return null
        }
      })
      setSearchResults(filterData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><LightbulbIcon fontSize={"large"} /> GoogleKeep</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" && "active"}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" && "active"}`} to="/about">About</Link>
              </li>

              {
                token && <input className="inputTag  ms-4 " type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />}

            </ul>

            {/* using ternary operator if user is authenticated we will show welcome and logout button else will show login and signup button.  */}
            {/* if you use directly localStorage.getItem("token") in ternary operator instead of using token which is state and we are 
            setting it in useEffect then if I am logged and I hit login url (http://localhost:3000/login) again through url bar then it will show welcome on login screen (that should show only when
            user is logged in) which will disapear only when I refresh the page to avoid that from happening I am using state instead of using localStorage.getItem("token") direactly */}
            {token ?

              <div className="d-flex justify-content-end">

                {/* using fontawesome to get user and logout icon. it's js is added in index.js */}
                <i className="nav-item my-auto  mx-1  fa-solid fa-user " style={{ color: "#FFF", cursor: "auto" }}> </i>
                {/* to make first letter of username capital userName[0].toUpperCase() + userName.substring(1) */}
                <p className="mx-2 my-auto" style={{
                  display: "inline-block", color: "#FFF"
                }}>Welcome <span style={{ textTransform: "capitalize" }}>{userName}</span></p>
                <i className=" my-auto ms-5 me-3 fa-solid fa-arrow-right-from-bracket" style={{ color: "#FFF" }} onClick={handleLogout}></i>

              </div>

              : <div>

                <Link className="btn btn-outline-dark btn-sm mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-outline-dark btn-sm" to="/signup" role="button">SignUp</Link>

              </div>
            }

          </div>
        </div>
      </nav>
      {/* ShowAlert component will be shown only when snackbar's open prop is true in ShowAlert component.  */}
      <ShowAlert />


    </>
  )
}

// When we use bootstrap in react we have to close all the input and hr tags.
// eg <input> to <input/> <hr> to <hr/>. do this to all self closing tags
// change all classes from class to className and for to htmlFor because class and for are reserved keywords in js.


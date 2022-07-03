import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { NoteContext } from "../context/notes/NoteState"
import { AlertContext } from "../context/AlertState"
import { TokenContext } from "../context/TokenState"

export default function Login() {
  // getting setUserName from NoteContext to set username in navbar.
  const { setUserName, host } = useContext(NoteContext)
  const { setAlert } = useContext(AlertContext)
  const { setToken } = useContext(TokenContext)

  // using useNavigate hook to navigate user to home page when user is authenticated.
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [setToken])
  // there is no need to add setToken in useEffect's dependency but to avoid waring I have added it in dependency array.
  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  // creating a function to handle login
  async function handleSubmit(e) {

    e.preventDefault()
    const response = await fetch(`${host}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(credentials)
    });

    const json = await response.json()
    if (json.success === true) {
      // if user is authenticated we will receive success = true and the userName.
      // saving username in localStorage to show it in navbar. If we save it in state it will change to it's default value when we refresh the page.
      localStorage.setItem("userName", json.userName)
      setUserName(localStorage.getItem("userName"))
      // saving authToken in localStorage so that we can give access to protected pages on the basis of this token.
      localStorage.setItem("token", json.authToken)
      // Show logged in alert
      setAlert(preval => (
        {
          ...preval,
          severity: "success",
          show: true,
          message: "Logged in successfully"
        }))

      //   // Hide logged in alert after 1 second
      // setTimeout(() => {
      //   setAlert(preval=>(
      //     {...preval,
      //     show: false
      // }))
      // }, 8000);

      // navigating the user to home page once the user is authenticated.
      navigate("/")
      setToken(localStorage.getItem("token"))
    }
    else {
      // Show logged in alert
      setAlert(preval => (
        {
          ...preval,
          severity: "error",
          show: true,
          message: "Invalid Username or Password"
        }))
    }

  }
  // if user is logged in and now he is on home page and now if he hits back button or uses url bar(http://localhost:3000/login) to go back to login page then
  // we will clear the token saved in local storage and we will let him log in again.
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")

  }

  return (
    <div className=" container-fluid" >
      <div className="row">
        <div className="col-md-3 col-lg-4 col-sm-2 col-xs-2"></div>
        <div className="col-md-6 col-lg-4 col-sm-8 col-xs-8">
          <form className="loginFormTopMargin form-container" onSubmit={handleSubmit}>
            <div className="mb-3 ">
              <h2 className="text-center mb-3">Login</h2>
              <label htmlFor="email" className="form-label">Email address</label>
              <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input name="password" type="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} />
            </div>
            <div className="d-flex justify-content-between ">
              <button type="submit" className="me-2 btn btn-warning btn-sm">Login</button>

              <Link className="ms-2 link-primary text-decoration-none my-1" to="/signup"> Create account</Link>
            </div>
          </form>
        </div>
        <div className="col-md-3 col-lg-4 col-sm-2 col-xs-2"></div>

      </div>
    </div>
  )
}

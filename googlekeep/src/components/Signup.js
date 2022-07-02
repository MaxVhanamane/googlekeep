import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// to show alert when user signs up
import { AlertContext } from "../context/AlertState"
import { TokenContext } from "../context/TokenState"
// import { NoteContext } from "../context/notes/NoteState"
export default function Signup() {
  const AlertContextVal = useContext(AlertContext)
  const { setAlert } = AlertContextVal
  const { setToken } = useContext(TokenContext)
  // const { host } = useContext(NoteContext)

  const navigate = useNavigate()
  // creating a state to store input values.
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [setToken])
  // there is no need to add setToken in useEffect's dependency but to avoid waring I have added it in dependency array.


  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  async function handleSignUp(e) {
    e.preventDefault()
    // checking if password and confirm password matches.
    if (credentials.password === credentials.cpassword) {
      const response = await fetch(`/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(credentials)
      });
      const json = await response.json()
      //   console.log(json)
      if (json.success === true) {
        // when user is authenticated we will receive token which we will store in local storage.
        localStorage.setItem("token", json.authToken)
        // to show the username in navbar we will save it in localstorage.
        localStorage.setItem("userName", json.userName)

        // Show sign up  alert
        setAlert(preval => (
          {
            ...preval,
            severity: "success",
            show: true,
            message: "Thanks for signing up!"
          }))

        navigate("/login")
        setToken(localStorage.getItem("token"))
      }
    }
    else {
      // Show sign up  alert
      setAlert(preval => (
        {
          ...preval,
          severity: "error",
          show: true,
          message: "Password and Confirm password do not match"
        }))

    }

  }

  // if user is logged in and now he is on home page and now if he uses url bar(http://localhost:3000/signup) to go back to signup page then
  // we will clear the token saved in local storage and we will let him sign up again using new creadentials.
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
  }

  return (
    <div className="container-fluid bg" >
      <div className="row">
        <div className="col-md-3 col-lg-4 col-sm-2 col-xs-2"></div>
        <div className="col-md-6 col-lg-4 col-sm-8 col-xs-8">

          <form className="form-container" onSubmit={handleSignUp}>
            <div className="mb-3 ">
              <h2 className="text-center mb-3">Sign Up</h2>
              <label htmlFor="text" className="form-label">Name</label>
              <input name="name" type="text" className="form-control" id="text" aria-describedby="nameHelp" onChange={handleChange} value={credentials.name} minLength="3" maxLength="26" />
            </div>
            <div className="mb-3 ">
              <label htmlFor="email" className="form-label">Email address</label>
              <input name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input name="password" type="password" className="form-control" id="password" onChange={handleChange} minLength="5" value={credentials.password} />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Confirm Password</label>
              <input name="cpassword" type="password" className="form-control" id="cpassword" onChange={handleChange} minLength="5" value={credentials.cpassword} />
            </div>

            <button type="submit" className="btn btn-warning">Sign Up</button>
          </form>

        </div>
        <div className="col-md-3 col-lg-4 col-sm-2 col-xs-2"></div>
      </div>
    </div>


  )
}

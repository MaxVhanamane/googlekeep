import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
export default function ProtectedRoutes() {

     
  return (
  <>
  {/* if user is logged in then we will give access to all the protected routes else will send him to login page  */}
     { localStorage.getItem("token") ? <Outlet/>:<Navigate to="/login"/>}
  </>
  )
}

// <Outlet /> will return all the components enclosed inside <ProtectedRoutes> <ProtectedRoutes />

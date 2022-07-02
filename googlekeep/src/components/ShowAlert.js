// import Alert from '@mui/material/Alert'; //npm i @mui/material npm install @emotion/react npm install @emotion/styled
// import React,{useContext} from 'react'
// import {AlertContext} from "../context/notes/AlertState"
// export default function ShowAlert() {
//   const AlertContextVal=useContext(AlertContext)
//    const {alert}=AlertContextVal
//    const show=alert.show
//   return (
//     <>
//   { show && <div className="container-fluid"><Alert severity={alert.severity}   >{alert.message}</Alert></div>}
//   </>
//   )
// }

import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AlertContext } from "../context/AlertState"

export default function SimpleSnackbar() {
  const AlertContextVal = useContext(AlertContext)
  const { alert, setAlert } = AlertContextVal
  const show = alert.show
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // handleling onClose event. 
  //If you do not add onClose prop in snackbar then it's autoHideDuration prop won't work (from documentation).
  const handleClose = (event, reason) => {
    // If user clicks on screen/window except snackbar notification then do nothing.
    if (reason === 'clickaway') {
      return
    }
    // If I don't add this snackbar will not hide automatically
    setAlert(preval => (
      {
        ...preval,
        show: false
      }))

  };


  return (
    <div >
      <Snackbar open={show} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }} >
        <div className="text-center">
          <Alert severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
}


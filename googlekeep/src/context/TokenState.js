import React from 'react'
// import NoteContext from "./NoteContext"
import { createContext, useState } from "react";

// creating context object and exporting it.
export const TokenContext = createContext();


function TokenState(props) {
    const [token, setToken] = useState(localStorage.getItem("token")) // to show username in navbar
 
    return (
        <TokenContext.Provider value={{token, setToken }}>
            {/* Provider will give access to all the above states and functions to the components which are in props.children */}
            {props.children}
        </TokenContext.Provider>
    )
}

export default TokenState


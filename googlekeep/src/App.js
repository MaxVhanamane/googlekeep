import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import Error from "./components/Error"
import InternalServerError from "./components/InternalServerError"
import ProtectedRoutes from "./components/ProtectedRoutes"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from "./context/notes/NoteState"
import AlertState from "./context/AlertState"
import TokenState from "./context/TokenState"
// Router is used to change page without reloading it.
// Router,Routes,Route and Link all these are used together. Link is used in navbar which will match the route we defined in Route.
// When we put components between opening and closing component (tag) all those components will be passed as a children.
// eg. <NoteState> xyz <NoteState/>
function App() {
  return (<>
    {/* putting all the components inside <NoteState></NoteState> so that they can use all the global variables declared in NoteState contex  */}
    {/* Enclosing the Notestate inside the AlertState component i.e "  <AlertState> <NoteState></NoteState> </AlertState>"so that I can use the states and functions defined in AlertState in NoteState context. 
        If I enclose AlertState inside Notestate i.e "<NoteState> <AlertState></AlertState> </NoteState>" then I can't access AlertState's 
        global variables/states in Notestate. */}
    <Router>
      <TokenState>
        <AlertState>
          <NoteState>

            <Navbar />
            <Routes>
              {/* putting Home component in a ProtectedRoutes. It will be accessible only when user is logged in. */}
              {/* Instead of using ProtectedRoutes I can use <Route exact path="/" element={localStorage.getItem("token")?<Home />:<Navigate to="/login"/>}></Route>
            but the ProtectedRoutes is mostly prefered. There is always another way. */}
              <Route element={<ProtectedRoutes />} >
                {/* when we go to "/" it will render Home component when we go to "/about" it will render About component and so on */}
                <Route exact path="/" element={<Home />}></Route>
              </Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/internalservererror" element={<InternalServerError />}></Route>
              <Route path="*" element={<Error />}></Route>
            </Routes>

          </NoteState>
        </AlertState>
      </TokenState>
    </Router>
  </>
  );
}

export default App;

import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Dashboard from './components/pages/Dashboard'
import Navbar from './components/Navbar'
import jwt_decode from 'jwt-decode'
import Project from './components/pages/Project'
import Bugs from './components/pages/Bugs'
import axios from 'axios'
import NotFound from './components/NotFound'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  const [projects, setProjects] = useState([])
  // const [users, setUsers] = useState([])
  // const [bugs, setBugs] = useState([])
  const [allUsers, setAllUsers] = useState([])
  // const [allMembers, setAllMembers] = useState([])
  const [checkedUsers, setCheckedUsers]= useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectForm, setProjectForm] = useState({
    name: "",
    language: "",
    description: '',
    notes: '',
    priority: '',
    manager: '',
    users: []
  })
  const initializeState = () => !!localStorage.getItem("jwt");

  const [authed, setAuthed] = useState(initializeState)


  // useEffect -- if the user navigates away from the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')

    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
      setAuthed(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
    const findAllUsers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
      setAllUsers(response.data)
      // console.log(response.data)
    }
    findAllUsers()
    // console.log(currentUser)
  }, []) // happen only once

  // console.log(currentUser)
  // console.log(allUsers)

  // console.log(currentUser)

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
      setAuthed(null)

    }
  }

  return (
    <div className='columns-1 items-center'>
      <header>
        <Navbar
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
      </header>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={authed ? <Dashboard handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} projects={projects} setProjects={setProjects} />
              : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} setAuthed={setAuthed}/>}
          />
          <Route
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} setAuthed={setAuthed}
            />}
          />

          <Route
            path="/projects/:id"
            element={authed ?
              <Project currentUser={currentUser} setCurrentUser={setCurrentUser} projects={projects} setProjects={setProjects} allUsers={allUsers} showProjectForm={showProjectForm} setShowProjectForm={setShowProjectForm} setProjectForm={setProjectForm} projectForm={projectForm} authed={authed} checkedUsers={checkedUsers} setCheckedUsers={setCheckedUsers} /> :
              <Navigate to='/login' />
            }
          />

          <Route
            path="/bugs"
            element={authed ?
              <Bugs currentUser={currentUser} setCurrentUser={setCurrentUser} /> :
              <Navigate to='/login' />
            }
          />
          {/* conditionally render auth locked routes */}
          <Route
            path="/profile"
            element=
            {authed ?
              <Profile
                handleLogout={handleLogout}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                projects={projects}
                setProjects={setProjects}
                allUsers={allUsers}
                showProjectForm={showProjectForm} setShowProjectForm={setShowProjectForm} setProjectForm={setProjectForm}
                projectForm={projectForm} 
                authed={authed} 
                checkedUsers={checkedUsers} 
                setCheckedUsers={setCheckedUsers}
                /> :
              <Navigate to='/' />
            }
          />


          <Route path='*' element={<NotFound />} />

        </Routes>
      </div>
    </div >
  );
}



export default App;

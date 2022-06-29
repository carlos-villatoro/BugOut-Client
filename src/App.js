import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
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

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [bugs, setBugs] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allMembers, setAllMembers] = useState([])
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
  // useEffect -- if the user navigates away from the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
    const findAllUsers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
      setAllUsers(response.data)
      console.log(response.data)
    }
    findAllUsers()
  }, []) // happen only once
  console.log(allUsers)
  // console.log(currentUser)

  
  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
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
            element={currentUser ? <Dashboard handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> 
            : <Navigate to="/login" />}
          />

          <Route
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route
            path="/projects/:id"
            element={<Project currentUser={currentUser} setCurrentUser={setCurrentUser} projects={projects} setProjects={setProjects} allUsers={allUsers} showProjectForm={showProjectForm} setShowProjectForm={setShowProjectForm} setProjectForm={setProjectForm} projectForm={projectForm} />}
          />

          <Route
            path="/bugs"
            element={<Bugs currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          {/* conditionally render auth locked routes */}
          <Route
            path="/profile"
            element=
           { <Profile 
            handleLogout={handleLogout} 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
            projects={projects} 
            setProjects={setProjects} 
            allUsers={allUsers} 
            showProjectForm={showProjectForm} setShowProjectForm={setShowProjectForm} setProjectForm={setProjectForm} 
            projectForm={projectForm}/> }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

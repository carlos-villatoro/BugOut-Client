import { useState, useEffect } from 'react'
import axios from 'axios'
import ManagerProfile from '../partials/ManagerProfile'
import MemberProfile from '../partials/MemberProfile'

export default function Profile({ currentUser, handleLogout, setCurrentUser, handleProjectSubmit, projects, setProjects, allUsers }) {
	
  const [projectForm, setProjectForm] = useState({
    name:"",
    language:"",
    description:'',
    notes: '',
    priority:'',
	manager: '',
    users: []
  })
	// state for the secret message (aka user privileged data)
	const [msg, setMsg] = useState('')

	// useEffect for getting the user data and checking auth
	useEffect(() => {
	const fetchData = async () => {
			try {
				// get the token from local storage
				const token = localStorage.getItem('jwt')
				// make the auth headers
				const options = {
					headers: {
						'Authorization': token
					}
				}
				// hit the auth locked endpoint
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile`, options)
				// example POST with auth headers (options are always last argument)
				// await axios.post(url, requestBody (form data), options)
				// set the secret user message in state
				setMsg(response.data.msg)
				// console.log(currentUser.role)
			} catch (err) {
				// if the error is a 401 -- that means that auth failed
				console.warn(err)
				if (err.response) {
					if (err.response.status === 401) {
						// panic!
						handleLogout()
					}
				}
			}
		}
		fetchData()
	})
	return (
		<div>
			{currentUser.role === 'manager'
			?
			<ManagerProfile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} projectForm={projectForm} setProjectForm={setProjectForm} handleProjectSubmit={handleProjectSubmit} projects={projects} setProjects={setProjects} allUsers={allUsers}/>
			:
			<MemberProfile  handleLogout={handleLogout} currentUser={currentUser}/>
			}
		</div>
	)
}
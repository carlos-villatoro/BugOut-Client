import { useState, useEffect } from 'react'
import axios from 'axios'
import ProjectForm from '../ProjectForm'
import { Link, Navigate } from 'react-router-dom'



export default function Profile({ currentUser, handleLogout,  projects, setProjects, allUsers, showProjectForm, setShowProjectForm, projectForm, setProjectForm }) {
	const [userProjects, setUserProjects] = useState([])
	
	const handleClick = () => {
		setShowProjectForm(!showProjectForm)
		setProjectForm({
			name: "",
			language: "",
			description: '',
			notes: '',
			priority: '',
			manager: '',
			users: []
		})
	}
	// event handler for when a new project is created
	const handleProjectSubmit = async (e, projectForm, setProjectForm) => {
		e.preventDefault()
		console.log(currentUser.id)
		// console.log(projectForm)
		try {
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/projects`, projectForm)
			// console.log(response.data)
			setProjects([...projects, response.data])
			
			// console.log(response)
			setProjectForm({
				name:"",
				language:"",
				description:'',
				notes: '',
				priority:'',
				manager: '',
				users: []
			})
			setShowProjectForm(false)
		} catch (error) {
			console.log(error)
		}
	  }
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
				// console.log(response.data)
				setUserProjects(response.data.projects)
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
	}, [])
	const sortedProjects = [...userProjects].sort((a, b) => a.priority > b.priority ? 1 : -1)
		.map((project) =>
			//add a Link to specific project
			<Link  to={`/projects/${project._id}`} key={`${project._id}`}>{project.name} {project.priority}</Link>
		);
	const managerProfile = (
		<div>
			<h1 className='items-center m-auto text-5xl'>{currentUser.role}</h1>
			<div className=' flex justify-center flex-col grayBackground py-6 w-[25%] m-auto rounded-lg'>
				
				<p>{currentUser.name}</p>

				<div>
				{showProjectForm ?
					<ProjectForm currentUser={currentUser} projectForm={projectForm} setProjectForm={setProjectForm} handleProjectSubmit={handleProjectSubmit} projects={projects} setProjects={setProjects} allUsers={allUsers} showProjectForm={showProjectForm} setShowProjectForm={setShowProjectForm} handleSubmit={handleProjectSubmit} />
					:
					sortedProjects
				}
				</div>
				<button
					onClick={() => handleClick() }
				>
				{showProjectForm ? 'Cancel' : 'Add a Project'}
				</button>
			</div>
		</div>
	)
	const memberProfile =(
		<div>
			<p>{currentUser.name}</p>
			<p>{currentUser.role}</p>
			<div> {sortedProjects}</div>
		</div>
	)
	// console.log(currentUser)

	if (!currentUser) {
		return <Navigate to="/login" />
	}

	return (
		<div >
			{currentUser && currentUser.role === 'manager'
				?
				managerProfile
				:
				memberProfile
			}
		</div>
	)
}
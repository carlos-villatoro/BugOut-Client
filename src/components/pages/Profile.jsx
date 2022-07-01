import { useState, useEffect } from 'react'
import axios from 'axios'
import ProjectForm from '../ProjectForm'
import { Link, Navigate } from 'react-router-dom'
import { BsFolderSymlinkFill } from 'react-icons/bs'

export default function Profile({ currentUser, handleLogout, projects, setProjects, allUsers, showProjectForm, setShowProjectForm, projectForm, setProjectForm, authed, checkedUsers, setCheckedUsers }) {
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
			// set projectform's users array to array of checked users id and assign to variable
			const updatedProjectForm = {
				...projectForm, users: checkedUsers.map(user => {
					return user._id
				})
			}
			// console.log(updatedProjectForm)
			// create project from updatedProjectForm
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/projects`, updatedProjectForm)
			// console.log('post for project submit',response.data)
			// add project to projects state
			setProjects([...projects, response.data])
			// console.log(response.data._id)
			// add project to userProjects state
			setUserProjects([...userProjects, response.data])
			// console.log(response)
			// clear the project form
			setProjectForm({
				name: "",
				language: "",
				description: '',
				notes: '',
				priority: '',
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
		//hide project form if page is navigated to 
		setShowProjectForm(false)
	}, [])

	// sort users project by priority
	const sortedProjects = [...userProjects].sort((a, b) => a.priority > b.priority ? 1 : -1)
		.map((project) =>
			//add a Link to specific project
			<div key={`${project._id}`}
				className='border rounded-2xl py-12 px-8 w-full min-w-[250px]'
			>
				<Link to={`/projects/${project._id}`} >
					<div className="text-center">
						<div className='bg-[#474747] inline-flex p-2 rounded-full'>
							<BsFolderSymlinkFill size={40} />
						</div>

						<h3 className='text-xl font-bold py-4 uppercase tracking-tight'>{project.name}</h3>
						<div className="flex flex-row">
							<div className="basis-1/2">Priority: {project.priority}</div>
							<div className="basis-1/2">Bugs: {project.bugs.length}</div>
						</div>
					</div>
				</Link>
			</div>
		)

	const managerProfile = (
		<div>
			<h1 className='items-center m-auto text-3xl px-4'>{authed.name}'s Projects</h1>
			<p className='items-center m-auto text-gray-500 text-xl px-4'>{authed.role}</p>
			<div className=' md:max-w-[1116px] mx-auto py-8 px-4 items-center max-w-full'>


				<div>
					{showProjectForm ?
						<ProjectForm currentUser={currentUser} projectForm={projectForm} setProjectForm={setProjectForm} handleProjectSubmit={handleProjectSubmit} projects={projects} setProjects={setProjects} allUsers={allUsers} showProjectForm={showProjectForm} setShowProjectForm={setShowProjectForm} handleSubmit={handleProjectSubmit} checkedUsers={checkedUsers} setCheckedUsers={setCheckedUsers} />
						:
						<div
							className="grid grid-cols-1 gap-8 md:grid-cols-3 content-around">
							{sortedProjects}
						</div>
					}
				</div>

				<button onClick={() => handleClick()} className='text-2xl rounded-lg px-3 py-1 m-4 bg-[#00E331] text-gray-700 clicked:transparent' >
					{showProjectForm ?
						'Cancel' :
						'Add a Project'
					}
				</button>

			</div>
		</div>
	)

	const memberProfile = (
		<div>
			<h1 className='items-center m-auto text-3xl px-4'>{authed.name}'s Projects</h1>
			<p className='items-center m-auto text-gray-500 text-xl px-4'>{authed.role}</p>
			<div className=' md:max-w-[1116px] mx-auto py-8 px-4 items-center max-w-full'>
				<div
					className="grid grid-cols-1 gap-8 md:grid-cols-3 content-around">
					{sortedProjects}
				</div>
			</div>
		</div>
	)

	// console.log(currentUser)
	// if not logged in navigate to login page
	if (!authed) {
		return <Navigate to="/login" />
	}

	return (
		<div >
			{authed && authed.role === 'manager'
				?
				managerProfile
				:
				memberProfile
			}
		</div>
	)
}
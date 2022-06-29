import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import axios from "axios"
import ProjectForm from "../ProjectForm"

export default function Project({showProjectForm, setShowProjectForm, setProjectForm, projectForm, currentUser, projects, setProjects, allUsers}) {
	const { id } = useParams()
	const [project, setProject] = useState([])
	const [users, setUsers] = useState([])


	const handleClick = () => {
		setProjectForm(project)
		setShowProjectForm(!showProjectForm)
	}

	const handleProjectEdit = async (e, projectForm) => {
		e.preventDefault()
		// console.log(projectForm)
		try {
			const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`, projectForm)
			setProject(response.data)
			setShowProjectForm(false)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() =>  {
		const project = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`)
				// console.log(response.data)
				setProject(response.data)
				setUsers(response.data.users)
			} catch (error) {
				console.log(error)
			}
		}
		project()
	}, [id])
	// to add users to projects in a way that doesn't break  the "includes" in the form can we do a split?
	console.log(project)

	// console.log(project.users)
	const user = users.map((user) =>{
		return <h2 key={user._id}>users associated: {user.name}</h2>
	})

	// const manager = users.filter(user => {
	// 	return !user.role === 'manager'
	// })
	// setPm(manager)

	return (
		<div>
			<div>
				<Link to={'/'}>Back to Projects</Link>
			</div>


			
			{showProjectForm ? 
			<ProjectForm 
			projectForm={projectForm}
			setProjectForm={setProjectForm}
			allUsers={allUsers}
			projects={projects}
			setProjects={setProjects}
			currentUser={currentUser}
			handleSubmit={handleProjectEdit}
			/>
			:
			<div>
			<h1>Project: {project.name}</h1>
			{/* <h2>Manager: {pm.name}</h2> */}
			<p>{project.description}</p>
			<p>Primary Language:{project.language}</p>
			<p>Priority: {project.priority}</p>
			{user}
			</div>
		}
			{currentUser.role === 'manager' ?
			<button onClick={() => handleClick()}>
				{showProjectForm? 'Cancel' : "Edit Project"}
			</button>
			:
			""
			}
			
		</div>
	)
}
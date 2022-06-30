import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import axios from "axios"
import ProjectForm from "../ProjectForm"
import BugForm from "../BugForm"
import Bugs from "./Bugs"

export default function Project({showProjectForm, setShowProjectForm, setProjectForm, projectForm, currentUser, projects, setProjects, allUsers, authed}) {
	const { id } = useParams()
	const [bugs, setBugs] = useState([])
	const [project, setProject] = useState([])
	const [users, setUsers] = useState([])
	const [showBugForm, setShowBugForm] = useState(false)
	const [showBugStatus, setShowBugStatus] = useState(false)
	const [bugForm, setBugForm] = useState({
		name: "",
		notes: "",
		priority: "",
		status: "Not Started"
	})
	

	const handleBugCreateClick = () => {
		setShowBugForm(!showBugForm)
		setBugForm({
			name: "",
			notes: "",
			priority: "",
			status: "Not Started"
		})
	}

	// event handler for when a new project is created
	const handleBugSubmit = async (e, bugForm, setBugForm) => {
		e.preventDefault()
		console.log(currentUser.id)
		// console.log(bugForm)
		try {
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/projects/${id}/bugs`, bugForm)
			// console.log("BUGSUBMITRESPONSEDATA",response.data)
			const bugResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${id}/bugs`)
			console.log("BUGRESPONSE", bugResponse)
			setBugs(bugResponse.data)
			
			// console.log(response)
			setBugForm({
				name:"",
				notes:"",
				priority:'',
				status: '',
			})
			setShowBugForm(false)
		} catch (error) {
			console.log(error)
		}
	  }

	const handleProjectEditClick = () => {
		setProjectForm(project)
		setShowProjectForm(!showProjectForm)
		setShowBugStatus(false)
	}

	const handleProjectEdit = async (e, projectForm) => {
		e.preventDefault()
		// console.log(projectForm)
		try {
			const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`, projectForm)
			setShowProjectForm(false)
			const projectResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`)
			console.log(projectResponse.data)
			setProject(projectResponse.data)
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
	
	// console.log(project.users)
	const user = users.map((user) =>{
		return <h2 key={user._id}>users associated: {user.name}</h2>
	})


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
			setShowProjectForm={setShowProjectForm}
			/>
			:
			<div>
			<h1>Project: {project.name}</h1>
			<h2>Manager: {project.manager}</h2>
			<p>{project.description}</p>
			<p>Primary Language:{project.language}</p>
			<p>Priority: {project.priority}</p>
			{user}
			{authed && authed.role === 'manager' ?
			<button onClick={() => handleProjectEditClick()}>
				 Edit Project
			</button>
			:
			""
			}
			{project.bugs !== []? 
				<Bugs 
				id={id}
				showBugStatus={showBugStatus}
				setShowBugStatus={setShowBugStatus}
				showBugForm={showBugForm}
				setShowBugForm={setShowBugForm}
				authed={authed}
				bugForm={bugForm}
				setBugForm={setBugForm}
				setProject={setProject}
				project={project}
				bugs={bugs}
				setBugs={setBugs}
				 />
				:
				""
			}
				{showBugForm ? 
			<BugForm 
			bugForm={bugForm}
			setBugForm={setBugForm}
			handleSubmit={handleBugSubmit}
			showBugStatus={showBugStatus}
			authed={authed}
			/> 
			: 
			''}
			<button 
			onClick={() => handleBugCreateClick()}
			>
				{showBugForm ? "Cancel" : "Create bug report"}
			</button>
			</div>
		}

		</div>
	)
}
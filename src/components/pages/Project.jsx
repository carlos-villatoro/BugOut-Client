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
	const [editProjectForm, setEditProjectForm] = useState({})
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
			console.log(bugResponse.data)
			setProject({...project, bugs: bugResponse.data})
			console.log(project)
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
			// console.log('response dot data for projects',projectResponse.data)
			setProject(projectResponse.data)
			setUsers(projectResponse.data.users)
			console.log('users inside handleProjectEdit',users)
		} catch (error) {
			console.log(error)
		}
	}
	console.log('users below handleProjectEdit',users)
	useEffect(() =>  {
		const project = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`)
				// console.log(response.data)
				setProject(response.data)
				setUsers(response.data.users)
				console.log('users inside useEffect',users)
			} catch (error) {
				console.log(error)
			}
		}
		project()
	}, [id])
	console.log('users above users map',users)
	console.log('project.users above users map',project.users)

	const projectUsers = users.map((user) =>{
		return <h2 key={user._id}>users associated: {user.name}</h2>
	})


	return (
		<div>
			{currentUser && users ? 
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
				project={project}
				/>
				:
				<div>
				<h1>Project: {project.name}</h1>
				<h2>Manager: {project.manager}</h2>
				<p>{project.description}</p>
				<p>Primary Language:{project.language}</p>
				<p>Priority: {project.priority}</p>
				{projectUsers}
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
			:
			<div>Loading</div>
		}
		</div>
	)
}
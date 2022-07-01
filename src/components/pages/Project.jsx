import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import ProjectForm from "../ProjectForm"
import BugForm from "../BugForm"
import Bugs from "./Bugs"
import { AiFillBug } from 'react-icons/ai'

export default function Project({ showProjectForm, setShowProjectForm, setProjectForm, projectForm, currentUser, projects, setProjects, allUsers, authed, checkedUsers, setCheckedUsers }) {
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
		// clear bug form
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
		try {
			// post the new bug
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/projects/${id}/bugs`, bugForm)
			// get all the bugs
			const bugResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${id}/bugs`)
			setBugs(bugResponse.data)
			console.log(bugResponse.data)
			// set project's bugs to latest bugs info
			setProject({ ...project, bugs: bugResponse.data })
			// reset the bug form
			setBugForm({
				name: "",
				notes: "",
				priority: '',
				status: '',
			})
			// don't show the bug form anymore
			setShowBugForm(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleProjectEditClick = () => {
		// set fill the project form with the current projects info
		setProjectForm(project)
		// toggle whether to show the project form
		setShowProjectForm(!showProjectForm)
		setShowBugStatus(false)
	}

	const handleProjectEdit = async (e, projectForm) => {
		e.preventDefault()
		// console.log(projectForm)
		try {
			// changes the users in project form to the checked users
			const updatedProjectForm = {
				...projectForm, users: checkedUsers.map(user => {
					return user._id
				})
			}
			// update the project
			const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`, updatedProjectForm)
			// hides project form
			setShowProjectForm(false)
			// gets updated project info
			const projectResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`)
			// console.log('response dot data for projects',projectResponse.data)
			setProject(projectResponse.data)
			setUsers(projectResponse.data.users)
			//reset checked users
			setCheckedUsers([])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const project = async () => {
			try {
				// get specific project info
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

	// map through all users associated with this project
	const projectUsers = users.map((user) => {
		return <h2 key={user._id}>users associated: {user.name}</h2>
	})


	console.log(project)
	return (
		<div >
			{/* if user is logged in & users exists */}
			{currentUser && users ? 
			// render everything 
			<div >
				{/* render project form if showProjectForm is true */}
				{showProjectForm ?
				<div>
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
					checkedUsers={checkedUsers}
					setCheckedUsers={setCheckedUsers}
					/>
					<button onClick={() => handleProjectEditClick()} className='text-xl rounded-lg px-3 py-1 m-4 bg-[#00E331] text-gray-700 '>
						Cancel
					</button>
				</div>
				:
				// render project info
				<div >
					<div className='flex justify-center flex-col grayBackground  m-auto  w-[400px] border rounded-2xl py-12 px-8 sm:w-[70%] min-w-[250px]'>
						<div className='flex items-center flex-col text-2xl m-0'>
							<h1 className="font-extrabold">Project: {project.name}</h1>
							<p>{project.description}</p>
							<p>Notes: {project.notes}</p>
							<p>Primary Language:{project.language}</p>
							<p>Priority: {project.priority}</p>
							{projectUsers}
							{authed && authed.role === 'manager' ?
							<button onClick={() => handleProjectEditClick()} className='text-xl rounded-lg px-3 py-1 m-4 bg-[#00E331] text-gray-700 '>
								Edit Project
							</button>
							:
							""
							}
						</div>
						{/* does the project have bugs? */}
					{project.bugs !== []?
					// if yes render the bugs component
					<div>
						<div className="basis-1/2 flex justify-center text-lg" ><AiFillBug size={25} className='mx-1'/></div>
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
							checkedUsers={checkedUsers}
							setCheckedUsers={setCheckedUsers}
						/>
							<button onClick={() => handleProjectEditClick()} className='text-xl rounded-lg px-3 py-1 m-4 bg-[#00E331] text-gray-700 '>
								Cancel
							</button> </div>
						:
						// render project info
						<div >
							<div className='flex justify-center flex-col grayBackground  m-auto  w-[400px] border rounded-2xl py-12 px-8 sm:w-[70%] min-w-[250px]'>
								<div className='flex items-center flex-col text-2xl m-0'>
									<h1 className="font-extrabold">Project: {project.name}</h1>
									<p>{project.description}</p>
									<p>Notes: {project.notes}</p>
									<p>Primary Language:{project.language}</p>
									<p>Priority: {project.priority}</p>
									{projectUsers}
									{authed && authed.role === 'manager' ?
										<button onClick={() => handleProjectEditClick()} className='text-xl rounded-lg px-3 py-1 m-4 bg-[#00E331] text-gray-700 '>
											Edit Project
										</button>
										:
										""
									}
								</div>
								{/* does the project have bugs? */}
								{project.bugs !== [] ?
									// if yes render the bugs component
									<div>
										<div className="basis-1/2 flex justify-center text-lg" ><AiFillBug size={25} className='mx-1' /></div>
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
									</div>
									:
									// otherwise leave blank
									""
								}
								{/* render bug form if showBugForm is true */}
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
									className='text-xl rounded-lg px-3 py-1 m-4 bg-[#00E331] text-gray-700 clicked:transparent'
								>
									{showBugForm ? "Cancel" : "Create bug report"}
								</button>
							</div>
						</div>
					}
				</div>
				:
				// render a loading screen
				<div>Loading</div>
			}
		</div>
	)
}
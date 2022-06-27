import { useEffect, useState } from "react"
import axios from "axios"

export default function Project() {
	const [project, setProject] = useState([])
	const [users, setUsers] = useState([])

	useEffect(() =>  {
		const project = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/62ba1d8123fc3f3434662234`)
				console.log(response.data)
				setProject(response.data)
				setUsers(response.data.users)
			} catch (error) {
				console.log(error)
			}
		}
		project()
	}, [])

	console.log(project.users)
	const user = users.map((user) =>{
		return <h2>Manager: {user.name}</h2>
	})
	return (
		<div>
			<h1>Project: {project.name}</h1>
			<p>{project.description}</p>
			<p>Primary Language:{project.language}</p>
			<p>Priority: {project.priority}</p>
			{user}
		</div>
	)
}
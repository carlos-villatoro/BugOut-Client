import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import axios from "axios"

export default function Project() {
	const { id } = useParams()
	const [project, setProject] = useState([])
	const [users, setUsers] = useState([])
	const [pm, setPm] = useState([])

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

	// const manager = users.filter(user => {
	// 	return !user.role === 'manager'
	// })
	// setPm(manager)

	return (
		<div>
			<div>
				<Link to={'/'}>Back to Projects</Link>
			</div>


			<div>
			<h1>Project: {project.name}</h1>
			{/* <h2>Manager: {pm.name}</h2> */}
			<p>{project.description}</p>
			<p>Primary Language:{project.language}</p>
			<p>Priority: {project.priority}</p>
			{user}
			</div>
			
		</div>
	)
}
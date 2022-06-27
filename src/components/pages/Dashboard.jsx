
import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Dashboard() {
	const [projects, setProjects] = useState([])

	useEffect(() => {
		const allProjects = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects`)
				setProjects(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		allProjects()
	}, [])

	const allProjects = projects.map(project => {
		<Link>{project.name}</Link>
	})
	return (
		<div>
			hello from Dashboard
			{allProjects}
		</div>
	)
}
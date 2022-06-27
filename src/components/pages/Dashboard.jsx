
import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard() {
	const [projects, setProjects] = useState([])

	useEffect(() => {
		const allProjects = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile`)
				console.Console.log(response.data)
				// setProjects = response.data
			} catch (error) {
				console.log(error)
			}
		}

	}, [])

	return (
		<div>
			hello from welcome
		</div>
	)
}
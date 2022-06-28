
import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Dashboard() {
	const [projects, setProjects] = useState([])
	const [search, setSearch] = useState('')

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

	const sortedProjects = [...projects].sort((a, b) => a.priority > b.priority ? 1 : -1)
		.map((project) =>
			//add a Link to specific project
			<Link  to={`/projects/${project._id}`} key={`${project._id}`}>{project.name} {project.priority}</Link>
		);


	const handleChange = (e) => {
		setSearch(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

	}

	const searchedDb = projects.filter(project => {
		let searchedTerm = search.toLowerCase()
		let lowerChaseName = project.name.toLowerCase()
		if (searchedTerm === '') {
			return ''
		} else {
			return lowerChaseName.includes(searchedTerm)
		}
	})

	const searchedItem = searchedDb.map(item => {
		return (
			<Link to={`/projects/${item._id}`}>{item.name}</Link>
		)
	})
	// console.log(projects)



	return (
		<div>
			hello from Dashboard
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search"
					onChange={handleChange}
					value={search}
				/>
			</form>
			{searchedDb.length === 0 ? (
				<div>
					<h3>All Projects</h3>
					<ul>
						{sortedProjects}
					</ul>
				</div>
			) :
				(
					<ul>
						{searchedItem}
					</ul>

				)}


		</div>
	)
}
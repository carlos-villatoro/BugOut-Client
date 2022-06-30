
import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {BsFolderSymlinkFill} from 'react-icons/bs'

export default function Dashboard({projects, setProjects}) {
	
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

			<Link to={`/projects/${project._id}`} key={`${project._id}`}>
				<div className='flex flex-col border text-left rounded-2xl py-12 px-8 max-w-[70%]'>
					<div>
						<div className='bg-[#474747] inline-flex p-2 rounded-full'>
							<BsFolderSymlinkFill size={40}/>
						</div>
						<h3 className='text-xl font-bold py-4 uppercase'>{project.name}</h3>
						<p>
							Priority: {project.priority}
						</p>
					</div>
				</div>
			</Link>

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
			<Link to={`/projects/${item._id}`}>
			<div className='flex flex-col border text-left rounded-2xl py-12 px-8 '>
				<div>
					<div className='bg-[#474747] inline-flex p-2 rounded-full'>
						<BsFolderSymlinkFill size={40}/>
					</div>
					<h3 className='text-xl font-bold py-4 uppercase'>{item.name}</h3>
				</div>
			</div>
		</Link>
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
					<div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:max-w-2 items-center">
						{sortedProjects}
					</div>
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
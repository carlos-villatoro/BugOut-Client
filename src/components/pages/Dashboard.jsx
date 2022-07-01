
import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { BsFolderSymlinkFill } from 'react-icons/bs'

export default function Dashboard({ projects, setProjects }) {

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

			<div key={`${project._id}`} className='  border text-left rounded-2xl py-12 px-8 md:max-w-[250px] max-w-[250px] '>
				<Link to={`/projects/${project._id}`} >
					<div>
						<div className='bg-[#474747] inline-flex p-2 rounded-full'>
							<BsFolderSymlinkFill size={40} />
						</div>
						<h3 className='text-xl font-bold py-4 uppercase'>{project.name}</h3>
						<p>
							Priority: {project.priority}
						</p>
					</div>
				</Link>
			</div>

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
			<div key={`${item._id}`} className='flex flex-col border text-left rounded-2xl py-12 px-8 '>
				<Link to={`/projects/${item._id}`}>
					<div>
						<div className='bg-[#474747] inline-flex p-2 rounded-full'>
							<BsFolderSymlinkFill size={40} />
						</div>
						<h3 className='text-xl font-bold py-4 uppercase'>{item.name}</h3>
					</div>
				</Link>
			</div>
		)
	})
	// console.log(projects)



	return (
		<div className="justify-center md:max-w-[1116px] mx-auto " >
			hello from Dashboard
			{/* <form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search"
					onChange={handleChange}
					value={search}
				/>
			</form> */}
			<form class="flex items-center" onSubmit={handleSubmit}>
				<label for="simple-search" class="sr-only">Search</label>
				<div class="relative w-full">
					<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
					</div>
					<input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00E331] focus:border-[#00E331] block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#00E331] dark:focus:border-[#00E331]" placeholder="Search for a Project" onChange={handleChange} value={search} required />
				</div>
			</form>
			{searchedDb.length === 0 ? (
				<div>
					<h3>All Projects</h3>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:max-w-2 justify-center ">
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
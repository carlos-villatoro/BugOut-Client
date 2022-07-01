
import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { BsFolderSymlinkFill } from 'react-icons/bs'

export default function Dashboard({ projects, setProjects, showProjectForm, setShowProjectForm }) {

	const [search, setSearch] = useState('')

	useEffect(() => {
		const allProjects = async () => {
			try {
				// get all projects
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects`)
				// set all projects in state
				setProjects(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		allProjects()
		// set show project form to false if navigated to this page
		setShowProjectForm(false)
	}, [])

	// sort projects by priority then map and display projects
	const sortedProjects = [...projects].sort((a, b) => a.priority > b.priority ? 1 : -1)
		.map((project) =>

			<div key={`${project._id}`}
				className='border text-left rounded-2xl py-12 px-8 md:max-w-[250px] max-w-[250px] p-5'
			>
				<Link to={`/projects/${project._id}`} >
					<div className="text-center">
						<div className='bg-[#474747] inline-flex p-2 rounded-full'>
							<BsFolderSymlinkFill size={40} />
						</div>

						<h3 className='text-xl font-bold py-4 uppercase tracking-tight'>{project.name}</h3>
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

	// uses search input to filter array of all projects
	const searchedDb = projects.filter(project => {
		let searchedTerm = search.toLowerCase()
		let lowerChaseName = project.name.toLowerCase()
		if (searchedTerm === '') {
			return ''
		} else {
			return lowerChaseName.includes(searchedTerm)
		}
	})

	// searched projects from input
	const searchedItem = searchedDb.map(item => {
		return (
			<div key={`${item._id}`} className='flex flex-col border text-left rounded-2xl py-12 px-8 md:max-w-[250px] max-w-[250px] '>
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
		<div className=" md:max-w-[1116px] mx-auto py-8 px-4 items-center max-w-full " >

			{/* search box */}
			<form class="flex items-center" onSubmit={handleSubmit}>
				<label for="simple-search" class="sr-only">Search</label>
				<div class=" sm:w-[250px] w-full">
					<input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00E331] focus:border-[#00E331] 
					block w-full pl-10 p-2.5 text-center 
					dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#00E331] dark:focus:border-[#00E331]"
						placeholder="Search for a Project"
						onChange={handleChange}
						value={search}
						required
					/>
				</div>
			</form>

			{/* display all projects or display searched items */}
			{searchedDb.length === 0 ?
				(
					<div>
						<h3 className="m-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">All Projects</h3>
						<div
							className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
							{sortedProjects}
						</div>
					</div>
				) :
				(
					<ul>
						{searchedItem}
					</ul>
				)
			}

		</div>
	)
}
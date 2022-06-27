import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

export default function Navbar({ currentUser, handleLogout }) {
	const [nav, setNav] = useState(true)

	const handleNav = () => {
		setNav(!nav)
	}

	const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>

			<Link to="/profile">
				profile
			</Link>
		</>
	)

	const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				register
			</Link>

			<Link to="/login">
				login
			</Link>
		</>
	)

	return (
		<div className='text-[#00E331] flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
			{/* user always sees this section */}
			<Link to="/">

				<h1 className='w-full text-3xl font-bold text-[#00E331]' id="logo">BugOut</h1>

			</Link>

			<ul className='hidden md:flex'>
				<li className='p-4'>Projects</li>
				<li className='p-4'>Bugs</li>
				<li className='p-4'>Profile</li>

			</ul>

			{/* mobile menu */}
			<div onClick={handleNav} className='block md:hidden'>
				{!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}

			</div>
			<div className={
				nav ?
					'fixed left-0 top-0 w-[30%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 md:hidden' :
					'fixed left-[-100%] md:hidden'
			}>
				<Link to="/">
					<h1 className='w-full text-3xl font-bold text-[#00E331] m-4 mt-7 pt-px'>BugOut</h1>
				</Link>

				<ul className=' uppercase p-4'>
					<li className='p-4 border-b border-gray-600'>Projects</li>
					<li className='p-4 border-b border-gray-600'>Bugs</li>
					<li className='p-4 border-b border-gray-600'>Profile</li>
				</ul>
			</div>
			{/* <nav>

				{currentUser ? loggedIn : loggedOut}
			</nav> */}

		</div>
	)
}
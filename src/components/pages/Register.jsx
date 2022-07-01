import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

export default function Register({ currentUser, setCurrentUser, setAuthed }) {
	// state for the controlled form
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post form data to the backend
			const reqBody = {
				name,
				email,
				password,
				role
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, reqBody)
			// console.log(reqBody)
			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// // decode the token
			const decoded = jwt_decode(token)

			// // set the user in App's state to be the decoded token
			setCurrentUser(decoded)
			setAuthed(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<div className=' flex justify-center flex-col grayBackground py-6  m-auto rounded-lg w-[300px] shrink-0'>
			<h1 className='flex items-center flex-col text-2xl m-0 underline'>Register</h1>

			<p>{msg}</p>

			<form onSubmit={handleSubmit} className='flex items-center flex-col'>
				<div className='relative'>
					<input
						type="text"
						id="name"
						placeholder='...'
						onChange={e => setName(e.target.value)}
						value={name}
						className=' block px-2.5 pb-2.5 pt-4 bg-transparent rounded-md py-1 pl-3  my-4 focus:outline-none focus:ring-0 border-1 border-gray-300 appearance-none focus:border-blue-600 peer'
					/>

					<label
						htmlFor='name'
						className='absolute text-gray-400  duration-300 transform -translate-y-4  top-2 z-10 origin-[0] bg-white dark:bg-gray-600 px-2 peer-focus:px-2 peer-focus:text-[#00E331] peer-focus:dark:text-[#00E331] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
					>Name:</label>
				</div>

				<div className='relative'>
					<input
						type="email"
						id="email"
						placeholder='...'
						onChange={e => setEmail(e.target.value)}
						value={email}
						className='block px-2.5 pb-2.5 pt-4 bg-transparent rounded-md py-1 pl-3  my-4 focus:outline-none focus:ring-0 border-1 border-gray-300 appearance-none focus:border-blue-600 peer'
					/>
					<label
						htmlFor='email'
						className='absolute text-gray-400  duration-300 transform -translate-y-4  top-2 z-10 origin-[0] bg-white dark:bg-gray-600 px-2 peer-focus:px-2 peer-focus:text-[#00E331] peer-focus:dark:text-[#00E331] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
					>Email:</label>
				</div>

				<div className='relative'>
					<input
						type="password"
						id="password"
						placeholder='...'
						onChange={e => setPassword(e.target.value)}
						value={password}
						className='block px-2.5 pb-2.5 pt-4 bg-transparent rounded-md py-1 pl-3  my-4 focus:outline-none focus:ring-0 border-1 border-gray-300 appearance-none focus:border-[#00E331] peer'
					/>
					<label
						htmlFor='password'
						className='absolute text-gray-400  duration-300 transform -translate-y-4  top-2 z-10 origin-[0] bg-white dark:bg-gray-600 px-2 peer-focus:px-2 peer-focus:text-[#00E331] peer-focus:dark:text-[#00E331] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
					>Password:</label>
				</div>

				<p className='flex items-center colum-row  '>Role:</p>
				<div className='mr-2'>
					<input
						type='radio'
						id='member'
						name='role'
						onChange={e => setRole(e.target.value)}
						value='member'

					/>
					<label htmlFor='member' className='mr-3'>Member</label>
					<input
						type='radio'
						id='manager'
						name='role'
						onChange={e => setRole(e.target.value)}
						value='manager'

					/>
					<label htmlFor='manager' >Manager</label>
				</div>

				<button type="submit" className='rounded-lg buttons px-3 py-1 m-2 '>Register</button>
			</form>
			<p className='flex items-center flex-col  '>Already have an account? <Link to='/login'>Login Now</Link></p>
		</div>
	)
}
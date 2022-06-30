import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link,  } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser, setAuthed }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post form data to the backend
			const reqBody = {
				email,
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, reqBody)

			// save the token in localStorage
			const { token } = response.data
			localStorage.setItem('jwt', token)
			console.log(token)
			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)
			setAuthed(decoded)

			
			// 
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
		return <Navigate to="/" replace />
	}

	return (
		<div className='flex justify-center flex-col grayBackground py-6  m-auto rounded-lg w-[300px] shrink-0'>
			<h1 className='flex items-center flex-col text-2xl m-0 underline'>Login</h1>

			<p>{msg}</p>

			<form onSubmit={handleSubmit} className='flex items-center flex-col'>
				{/* <label htmlFor='email'>Email:</label> */}
				<input
					type="email"
					id="email"
					placeholder='Enter Email'
					onChange={e => setEmail(e.target.value)}
					value={email}
					className='"bg-white rounded-md py-1 pl-3  my-4'
				/>

				{/* <label htmlFor='password'>Password:</label> */}
				<input
					type="password"
					id="password"
					placeholder='Enter Password'
					onChange={e => setPassword(e.target.value)}
					value={password}
					className='bg-white rounded-md py-1 pl-3  '
				/>

				<button type="submit" className='rounded-lg buttons px-3 py-1 m-2 '>Login</button>
			</form>
			<p className='flex items-center flex-col  '>Don't have an account? <Link to='/register'>Register One Now</Link></p>
		</div>
	)
}
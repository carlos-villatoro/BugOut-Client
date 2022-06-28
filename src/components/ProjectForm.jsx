import axios from 'axios'
import { useState } from 'react'

export default function ProjectForm({currentUser, handleLogout, setCurrentUser}) {
    const [projects, setProjects] = useState([])
    const [projectForm, setProjectForm] = useState({
        name:"",
        language:"",
        description:'',
        notes: '',
        priority:'',
        users: ''
    })
    // event handler for when a new project is created
  const handleProjectSubmit = async (e, projectForm, setProjectForm) => {
    e.preventDefault()
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/projects`, projectForm)
        setProjects([...projects, response.data])
        console.log(response)
        setProjectForm({
            name:"",
            language:"",
            description:'',
            notes: '',
            priority:'',
            users: ''
        })
        
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <form onSubmit={e => handleProjectSubmit(e, projectForm, setProjectForm)}>
        <label htmlFor='name'>Project Name:</label>
        <input
            type='text'
            id='name'
            value={projectForm.name}
            onChange={e => setProjectForm({...projectForm, name: e.target.value})}
            placeholder='Project Name'
            required
        />
        <label htmlFor='language'>Project Language:</label>
        <input
            type='text'
            id='language'
            value={projectForm.language}
            onChange={e => setProjectForm({...projectForm, language: e.target.value})}
            placeholder='Project Language'
            required
        />
        <label htmlFor='description'>Project Description:</label>
        <input
            type='text'
            id='description'
            value={projectForm.description}
            onChange={e => setProjectForm({...projectForm, description: e.target.value})}
            placeholder='Project Description'
            required
        />
        <label htmlFor='notes'>Project Notes:</label>
        <input
            type='text'
            id='notes'
            value={projectForm.notes}
            onChange={e => setProjectForm({...projectForm, notes: e.target.value})}
            placeholder='Project Notes'
        />
        <label htmlFor='priority'>Project Priority:</label>
        <input
            type='number'
            id='priority'
            value={projectForm.priority}
            onChange={e => setProjectForm({...projectForm, priority: e.target.value})}
            min='1'
            max='5'
            placeholder='1'
            required
        />
        <label htmlFor='users'>Project Members:</label>
        <select
            name='users'
            id='users'
            multiple
        >
            <option value={projectForm.users}>Member1</option>
            <option value={projectForm.users}>Member2</option>
            <option value={projectForm.users}>Member3</option>
            <option value={projectForm.users}>Member4</option>
        </select>
        <button type='submit'>Submit</button>
    </form>
  )
}

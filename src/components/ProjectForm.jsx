import axios from 'axios'
import { useInsertionEffect } from 'react'
import { useState } from 'react'

export default function ProjectForm({currentUser, handleLogout, setCurrentUser, projectForm, setProjectForm, allUsers, projects, setProjects}) {
    const allMembers = allUsers.filter(user => {
        return user.role !== 'manager'
    })

    const availableUsers = allMembers.map(member => {
        return(
            <p key={member._id}>
            <input id={`${member._id}`} type='checkbox' value={member._id} checked={projectForm.users.includes(member._id)} onClick={e=> handleCheckbox(e)}/>
            <label htmlFor={`${member.id}`}>{member.name}</label>
            </p>
        )
       
    })
    console.log(allMembers)
    const handleCheckbox = e =>{
        // console.log(e)
        if(e.target.checked){
            setProjectForm({...projectForm, users:[...projectForm.users, e.target.value]})
        }else{
            const projectUsers = projectForm.users.filter(user => {
                return !user === e.target.value
            })
            setProjectForm({...projectForm, users:projectUsers})
        }
        
    }

    // event handler for when a new project is created
  const handleProjectSubmit = async (e, projectForm, setProjectForm) => {
    e.preventDefault()
    console.log(projectForm)
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/projects`, projectForm)
        console.log(response.data)
        setProjects([...projects, response.data])
        // console.log(response)
        setProjectForm({
            name:"",
            language:"",
            description:'',
            notes: '',
            priority:'',
            users: []
        })
        
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <form 
    className='flex items-center flex-col'
    onSubmit={e => handleProjectSubmit(e, projectForm, setProjectForm)}>
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
        {availableUsers}
        
        <button type='submit'>Submit</button>
    </form>
  )
}

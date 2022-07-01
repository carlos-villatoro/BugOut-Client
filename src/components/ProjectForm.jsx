import { useState } from 'react'
import { useEffect } from 'react'


export default function ProjectForm({currentUser, projectForm, setProjectForm, allUsers, projects, setProjects, showProjectForm, setShowProjectForm, handleSubmit, project, checkedUsers, setCheckedUsers, authed}) {

    const handleCancelClick = () => {
        setShowProjectForm(!showProjectForm)
        setProjectForm(project)
    }
    // filter through allUsers and return only members (not managers)
    const allMembers = allUsers.filter(user => {
        return user.role !== 'manager'
    })
    
    const availableUsers = allMembers.map((member, i) => {
        // console.log('XXXXXX',checkUsers(member._id))
        
        return(
            <div key={member._id}>
                <p>
                    {/* checked boolean determined by whether member id matches to one in checkedUsers */}
                <input id={`${member._id}`} type='checkbox' value={member._id} checked={checkedUsers.some((user) => user._id === member._id)} onChange={e=> handleCheckbox(e, i)}/>
                <label htmlFor={`${member._id}`}>{member.name}</label>
                </p>
            </div>
        )
  
    })

    const handleCheckbox = (e, i) =>{
        // console.log(e)
        // map through checked users and return their ids
        const checkedUsersIds = checkedUsers.map(user => {
            return user._id
        })
        console.log(checkedUsersIds)
        // if you check a user & they're aren't already in checkedUsers, add them
        if(e.target.checked && !checkedUsers.some((user) => user._id === e.target.value)){
            // add a member that has an id that matches the value of the checkbox to checkedUsers
            setCheckedUsers([...checkedUsers, allMembers.find(member => member._id === e.target.value)]) 
        // if you uncheck a user & they are in checkedUsers remove them
        }else if(!e.target.checked && checkedUsers.some((user) => user._id === e.target.value)) {
            // find the index of specific user
            const idx = checkedUsersIds.indexOf(e.target.value)
            // make a copy of checkedUSers
            const checkedUsersCopy = [...checkedUsers]
            // remove the user at found index
            checkedUsersCopy.splice(idx, 1)
            // set checkedUsers to the updated checkedUsersCopy
            setCheckedUsers(checkedUsersCopy)
        }
    }

    useEffect(()=>{
        // set the form to project form being passed down and current users to manager
        setProjectForm({...projectForm, manager:currentUser.id})
    },[])
    useEffect(()=>{
        // set checked users to reflect the users in projectForm
        setCheckedUsers(projectForm.users)
    },[projectForm])
    
  return (
    <form 
    className='flex items-center flex-col'
    onSubmit={e => handleSubmit(e, projectForm, setProjectForm)}>
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
        <input hidden type='text' value={currentUser.id} id="manager" readOnly/>
        <label htmlFor='users'>Project Members:</label>
        {availableUsers}
        
        <button type='submit'>Submit</button>

        <button onClick={() => handleCancelClick()}>Cancel</button>
    </form>
  )
}

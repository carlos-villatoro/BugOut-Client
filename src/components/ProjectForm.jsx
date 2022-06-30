import { useEffect } from 'react'


export default function ProjectForm({currentUser, projectForm, setProjectForm, allUsers, projects, setProjects, showProjectForm, setShowProjectForm, handleSubmit, authed}) {

    const handleClick = () => {
        setShowProjectForm(!showProjectForm)
    }

    const allMembers = allUsers.filter(user => {
        return user.role !== 'manager'
    })
    
    const checkUsers = (member) => {
        let checked = false
        for(let i= 0; i < projectForm.users.length; i++){
            if(projectForm.users[i]._id === member){
                checked = true
                break
            }
        }
        return checked
    }
    const availableUsers = allMembers.map((member, i) => {
        console.log(projectForm.users)
        return(
            <div key={member._id}>
                <p>
                <input id={`${member._id}`} type='checkbox' value={member._id} checked={checkUsers(member._id)} onChange={e=> handleCheckbox(e, i)}/>
                <label htmlFor={`${member.id}`}>{member.name}</label>
                </p>
            </div>
        )
  
    })
   
    const handleCheckbox = (e, i) =>{
        // console.log(e)
        if(e.target.checked && !checkUsers(e.target.value)){
            setProjectForm({...projectForm, users:[...projectForm.users, allMembers.find(member => member._id === e.target.value)]})
        }else if(!e.target.checked && checkUsers(e.target.value)) {
            // console.log(i, '🌗')
            projectForm.users.splice(i, 1)
            setProjectForm({...projectForm, users: projectForm.users})
           
        }
    }

    useEffect(()=>{
        setProjectForm({...projectForm, manager:currentUser.id})
    },[])

    
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

        <button onClick={() => handleClick()}>Cancel</button>
    </form>
  )
}

import ProjectForm from "../ProjectForm"
import { useState } from 'react'

export default function ManagerProfile({handleLogout, currentUser, setCurrentUser, projectForm, setProjectForm,handleProjectSubmit}) {
    const [showProjectForm, setShowProjectForm] = useState(false)
  return (
    <div>
        ManagerProfile
        {showProjectForm ?
        <ProjectForm handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} projectForm={projectForm} setProjectForm={setProjectForm} handleProjectSubmit={handleProjectSubmit}/>
    
        :
        'projects'
        }
        <button 
            onClick={() => {setShowProjectForm(!showProjectForm)}}
            >
                Add a Project
            </button>
    </div>
  )
}

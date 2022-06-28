import ProjectForm from "../ProjectForm"
import { useState } from 'react'

export default function ManagerProfile({handleLogout, currentUser, setCurrentUser, projectForm, setProjectForm,handleProjectSubmit, projects, setProjects, allUsers}) {
    const [showProjectForm, setShowProjectForm] = useState(false)
  return (
    <div>

        <p>ManagerProfile</p>

        <div>
            {showProjectForm ?
            <ProjectForm handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} projectForm={projectForm} setProjectForm={setProjectForm} handleProjectSubmit={handleProjectSubmit} projects={projects} setProjects={setProjects} allUsers={allUsers}/>
            :
            'projects'
            }
        </div>
        <button 
            onClick={() => {setShowProjectForm(!showProjectForm)}}
            >
                {showProjectForm ? 'Cancel' : 'Add a Project'}
            </button>
    </div>
  )
}

import React from 'react'
import { useState } from 'react'
import BugForm from '../BugForm'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function BugDetails({project, setProject, bug, handleClick, showBugForm, setShowBugForm, bugForm, setBugForm, setBug, currentUser, showBugStatus, setShowBugStatus, projectId }) {
     const navigate = useNavigate()
    const [showEditBugForm, setShowEditBugForm] = useState(false)
    // console.log(bug._id)
    const handleBugEditClick = () => {
        setShowEditBugForm(!showEditBugForm)
        setBugForm(bug)
        setShowBugStatus(true)
    }

    const findBug = (project) => {
        for(let i = 0; i < project.bugs.length; i++){
          if(project.bugs[i] === bug._id){
            return i
          }
        }
    }
    const handleDelete = async() => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${projectId}`)
      const projectBugs = response.data.bugs
      projectBugs.splice(findBug(project), 1)
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/bugs/${bug._id}`)
      // setProject({...project, bugs:[...project.bugs, projectBugs]})
      console.log(response.data)
      navigate(`/projects/${projectId}`)
    }

    const handleBugEditSubmit = async (e, bugForm) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/bugs/${bug._id}`, bugForm)
            setBug(response.data)
            setShowBugForm(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h1>Bug Title: {bug.name}</h1>
                <p>Notes: {bug.notes}</p>
                <p>Created: {bug.dateCreated}</p>
                <p>Priority: {bug.priority}</p>
                <p>Status: {bug.status}</p>
                {showEditBugForm?
                <BugForm 
                bugForm={bugForm}
                setBugForm={setBugForm}
                handleSubmit={handleBugEditSubmit}
                currentUser={currentUser}
                showBugStatus={showBugStatus}
                />
                :
                ""    
                }
                <button
                onClick={()=> handleBugEditClick()}
                >
                    {showEditBugForm ?
                    "Cancel"
                    :
                    "Edit Bug Form" 
                    }
                </button>
                <button onClick={() => {handleDelete()}}>
                  Delete Bug
                </button>
    </div>
  )
}
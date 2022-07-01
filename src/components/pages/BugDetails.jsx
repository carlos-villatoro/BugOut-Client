import React from 'react'
import { useState } from 'react'
import BugForm from '../BugForm'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function BugDetails({project, setProject, bug, handleClick, showBugForm, setShowBugForm, bugForm, setBugForm, setBugs, currentUser, showBugStatus, setShowBugStatus, projectId, authed }) {
    const navigate = useNavigate()
    const [showEditBugForm, setShowEditBugForm] = useState(false)
    // console.log(bug._id)
    const handleBugEditClick = () => {
        setShowEditBugForm(!showEditBugForm)
        setBugForm(bug)
        setShowBugStatus(true)
    }
    // loop through array of all bugs associated w/project & if one matches specific bug return its index
    const findBug = (project) => {
        for(let i = 0; i < project.bugs.length; i++){
          if(project.bugs[i] === bug._id){
            return i
          }
        }
    }
    const handleDelete = async() => {
      // get the specific project info
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${projectId}`)
      // set specific projects bug array to variable
      const projectBugs = response.data.bugs
      // remove found bug (from line 18) from bug array
      const spliced = projectBugs.splice(findBug(project), 1)
      // console.log('spliced*****',spliced)
      // console.log('XXXXXXXXXXXX',projectBugs)
      // update project state with updated bug array
      setProject({...project, bugs: projectBugs})
      // console.log("projectBugs", projectBugs, "projectState", project)
      // update db with new project state
      const projectResponse = await axios.put(`${process.env.REACT_APP_SERVER_URL}/projects/${projectId}`, project)
      // console.log('PROJECT RESPONSE DOT DATA!!',projectResponse.data)
      // delete specific bug from db
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/bugs/${bug._id}`)
      // get all bugs
      const updatedBugs = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${projectId}/bugs`)
      // console.log(updatedBugs.data)
      setBugs(updatedBugs.data)
    }

    const handleBugEditSubmit = async (e, bugForm) => {
        e.preventDefault()
        try {
          // update bug db from bugForm info
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/bugs/${bug._id}`, bugForm)
            // get all bugs
            const bugResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${projectId}/bugs`)
            // console.log(bugResponse.data)
            setBugs(bugResponse.data)
            // hide bug form
            setShowEditBugForm(false)
            // console.log('bug has been edited')
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
                authed={authed}
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
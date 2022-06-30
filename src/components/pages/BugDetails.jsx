import React from 'react'
import { useState } from 'react'
import BugForm from '../BugForm'
import axios from 'axios'

export default function BugDetails({bug, handleClick, showBugForm, setShowBugForm, bugForm, setBugForm, setBug, currentUser, showBugStatus }) {
    const [showEditBugForm, setShowEditBugForm] = useState(false)
    
    const handleBugEditClick = () => {
        setShowEditBugForm(!showEditBugForm)
        setBugForm(bug)
    }

    const handleBugEditSubmit = async (e, bugForm, id) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/bugs/${id}`, bugForm)
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
                    {showBugForm ?
                    "Cancel"
                    :
                    "Edit Bug Form"
                    }
                </button>
    </div>
  )
}
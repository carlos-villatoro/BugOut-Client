import {useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function BugForm({authed, bugForm, setBugForm, handleSubmit, showBugStatus}) {
    const {id}= useParams()
    console.log(bugForm)

    const handleStatusChange = e => {
        // console.log("this is what the new status should be:",e.target.value)
        setBugForm({...bugForm, status: e.target.value})
    }
    

  return (
    <form
    className='flex items-center flex-col'
    onSubmit={ e=> handleSubmit(e, bugForm, setBugForm, id) }
    >
        <label htmlFor='name'>Bug Name:</label>
        <input
            type='text'
            id='name'
            value={bugForm.name}
            onChange={e => setBugForm({...bugForm, name: e.target.value})}
            required
        />
        <label htmlFor='notes'>Bug Notes:</label>
        <input
            type='text'
            id='notes'
            value={bugForm.notes}
            onChange={e => setBugForm({...bugForm, notes: e.target.value})}
            required
        />
        <label htmlFor='priority'>Bug Priority:</label>
        <input
            type='number'
            id='priority'
            value={bugForm.priority}
            onChange={e => setBugForm({...bugForm, priority: e.target.value})}
            min='1'
            max='5'
            required
        />
        {showBugStatus ? 
        <div>
            <p>Bug Report Status:</p>
            
            <input
                type='radio'
                id='WIP'
                name='status'
                value="WIP"
                onChange={(e) => handleStatusChange(e)}
            />
            <label htmlFor='WIP'>WIP</label>
            {/* only available to non-managers */}
            {authed.role === 'member' ? 
            <div>
                <input
                type='radio'
                id='needsApproval'
                name='status'
                value='Needs Approval'
                onChange={(e) => handleStatusChange(e)}
                />
                <label htmlFor='needsApproval'>Needs Approval</label>
            </div>
            :
            ''
            }
            {/* only available to managers */}
            {authed.role === 'manager' ?
                <div>
                    <input
                    type='radio'
                    id='closed'
                    name='status'
                    value='Closed'
                    onChange={(e) => handleStatusChange(e)}
                    />
                    <label htmlFor='closed'>Closed</label>
                </div>
            :
            ''
            }
        </div>
        :
        ""
        }
        <button type='submit' className='text-xl rounded-lg px-3 py-1 m-4 bg-[#00E331] text-gray-700 '>Submit</button>
    </form>
  )
}
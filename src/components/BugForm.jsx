import {useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function BugForm({currentUser, bugForm, setBugForm, handleSubmit}) {
    const {id}= useParams()
    

    

  return (
    <form
    className='flex items-center flex-col'
    onSubmit={ e=> handleSubmit(e, bugForm, setBugForm) }
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
        <div>
            <p>Bug Report Status:</p>
            <input
                type='radio'
                id='notStarted'
                name='status'
                value={bugForm.status}
                onChange={e => setBugForm({...bugForm, status: e.target.value})}
                
            />
            <label htmlFor='notStarted'>Not Started</label>
            <input
                type='radio'
                id='WIP'
                name='status'
                value={bugForm.status}
                onChange={e => setBugForm({...bugForm, status: e.target.value})}
            />
            <label htmlFor='WIP'>WIP</label>
            <input
                type='radio'
                id='needsApproval'
                name='status'
                value={bugForm.status}
                onChange={e => setBugForm({...bugForm, status: e.target.value})}
            />
            <label htmlFor='needsApproval'>Needs Approval</label>
            <input
                type='radio'
                id='closed'
                name='status'
                value={bugForm.status}
                onChange={e => setBugForm({...bugForm, status: e.target.value})}
            />
            <label htmlFor='closed'>Closed</label>
        </div>
        <button type='submit'>Submit</button>
    </form>
  )
}
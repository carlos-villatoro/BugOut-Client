import {useState} from 'react'

export default function BugForm() {
    const [bugForm, setBugForm] = useState({})
  return (
    <form
    className='flex items-center flex-col'
    >
        <label htmlFor='name'>Bug Name:</label>
        <input
            type='text'
            id='name'
            value={bugForm.name}
            required
        />
        <label htmlFor='notes'>Bug Notes:</label>
        <input
            type='text'
            id='notes'
            value={bugForm.notes}
            required
        />
        <label htmlFor='priority'>Bug Priority:</label>
        <input
            type='number'
            id='priority'
            value={bugForm.priority}
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
            />
            <label htmlFor='notStarted'>Not Started</label>
            <input
                type='radio'
                id='WIP'
                name='status'
                value={bugForm.status}
            />
            <label htmlFor='WIP'>WIP</label>
            <input
                type='radio'
                id='needsApproval'
                name='status'
                value={bugForm.status}
            />
            <label htmlFor='needsApproval'>Needs Approval</label>
            <input
                type='radio'
                id='closed'
                name='status'
                value={bugForm.status}
            />
            <label htmlFor='closed'>Closed</label>
        </div>
        <button type='submit'>Submit</button>
    </form>
  )
}

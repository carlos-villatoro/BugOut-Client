import {useState} from 'react'

export default function BugForm() {
    const [bugForm, setBugForm] = useState({})
  return (
    <form>
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
        <label htmlFor='status'>Bug Status:</label>
        <input
            type='text'
            id='status'
            value={bugForm.status}
            required
        />
        <button type='submit'>Submit</button>
    </form>
  )
}

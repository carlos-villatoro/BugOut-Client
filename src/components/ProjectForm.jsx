import { useState } from 'react'

export default function ProjectForm() {
    const [projectForm, setProjectForm] = useState({})
  return (
    <form>
        <label htmlFor='name'>Project Name:</label>
        <input
            type='text'
            id='name'
            value={projectForm.name}
            required
        />
        <label htmlFor='language'>Project Language:</label>
        <input
            type='text'
            id='language'
            value={projectForm.language}
            required
        />
        <label htmlFor='description'>Project Description:</label>
        <input
            type='text'
            id='description'
            value={projectForm.description}
            required
        />
        <label htmlFor='notes'>Project Notes:</label>
        <input
            type='text'
            id='notes'
            value={projectForm.notes}
        />
        <label htmlFor='priority'>Project Priority:</label>
        <input
            type='number'
            id='priority'
            value={projectForm.priority}
            min='1'
            max='5'
            required
        />
        <label htmlFor='users'>Project Members:</label>
        <select
            name='users'
            id='users'
            multiple
        >
            <option value={projectForm.users}>Member1</option>
            <option value={projectForm.users}>Member2</option>
            <option value={projectForm.users}>Member3</option>
            <option value={projectForm.users}>Member4</option>
        </select>
        <button type='submit'>Submit</button>
    </form>
  )
}

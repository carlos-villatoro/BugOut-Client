import { useEffect, useState } from "react"
import axios from "axios"

export default function Bug() {
    const [bugs, setBugs] = useState([])
    // const [users, setUsers] = useState([])

    useEffect(() => {
        const bugs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bugs`)
                // console.log(response.data)
                setBugs(response.data)
                // setUsers(response.data.users)
            } catch (error) {
                console.log(error)
            }
        }
        bugs()
    }, [])

    const allBugs = bugs.map(bug => {
        return (
            <div key={`bugId${bug._id}`} className='m-4'>
                <h1>Bug Title: {bug.name}</h1>
                <h2>Project:</h2>
                <p>Notes: {bug.notes}</p>
                <p>Created: {bug.dateCreated}</p>
                <p>Priority: {bug.priority}</p>
                <p>Status: {bug.status}</p>
            </div>
        )
    })

    // console.log(bugs.users)
    // const user = users.map((user) =>{
    // 	return <h2 key={user._id}>Manager: {user.name}</h2>
    // })
    return (
        <>
        <h1 className="text-l">Bugs</h1>
        { allBugs }
        </>
    )
}
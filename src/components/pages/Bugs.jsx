import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import BugForm from "../BugForm"
import BugDetails from "./BugDetails"

export default function Bug({ showBugForm, setShowBugForm, showBugStatus, setShowBugStatus, currentUser, bugForm, setBugForm }) {
    const [bugs, setBugs] = useState([])
    const [bug, setBug] = useState({})
    // const [users, setUsers] = useState([])
    const {id} = useParams()

    const handleBugEditClick = () => {
        setShowBugForm(!showBugForm)
        setBugForm(bug)
    }
    
    

    useEffect(() => {
        const bugs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects/${id}/bugs`)
                // console.log(response.data)
                setBugs(response.data)
                // setUsers(response.data.users)
            } catch (error) {
                console.log(error)
            }
        }
        bugs()
    }, [])
    // console.log('this is the id:', id)
    const allBugs = bugs.map(bug => {
        return (
            <div key={`bugId${bug._id}`} className='m-4'>
                
                <BugDetails 
                bug={bug}
                handleClick={handleBugEditClick}
                showBugForm={showBugForm}
                bugForm={bugForm}
                setBugForm={setBugForm}
                setShowBugForm={setShowBugForm}
                setBug={setBug}
                currentUser={currentUser}
                showBugStatus={showBugStatus}
                />
               
                
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
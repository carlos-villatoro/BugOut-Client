import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import BugForm from "../BugForm"
import BugDetails from "./BugDetails"

export default function Bug({project, setProject, showBugForm, setShowBugForm, showBugStatus, setShowBugStatus, currentUser, bugForm, setBugForm, authed, bugs, setBugs }) {
    
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
                // get all bugs associated w/ specific project
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
    
    // map through the bugs and pass down to bug details component
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
                setBugs={setBugs}
                authed={authed}
                showBugStatus={showBugStatus}
                setShowBugStatus={setShowBugStatus}
                projectId={id}
                setProject={setProject}
                project={project}
                />
            </div>
        )
    })

    return (
        <>
        { allBugs }
        </>
    )
}
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from "sweetalert"
import MyNotesForm from './mynoteForm'
import MyNotesList from './mynoteList'

const MyNotes = (props) => {
    const [token,setToken]=useState("")
    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        const tokenValue = JSON.parse(localStorage.getItem("loginToken"))
        setToken(tokenValue.token)
        const url = "http://dct-user-auth.herokuapp.com/api/notes"
        axios.get(url, { headers: { "x-auth": tokenValue.token } })
            .then((res) => {
                setNotes(res.data.reverse())
            })
            .catch((err) => {
                swal(err.message)
            })
    }, [])

    const handleNotes=(val)=>{setNotes(val)}
    
    
    return (
        <div className="mynotes">
            <div className="notelist">
                <h3>My Notes</h3>
                <MyNotesList token={token} notes={notes} handleNotes={handleNotes} />
            </div>
            <div className="noteform">
                <h3>Add Note</h3>
                <MyNotesForm token={token} notes={notes} handleNotes={handleNotes}/>
            </div>
        </div>
    )
}
export default MyNotes
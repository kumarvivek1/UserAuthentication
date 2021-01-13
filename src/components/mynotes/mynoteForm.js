import React,{useState} from 'react'
import axios from 'axios'
import swal from "sweetalert"

const MyNotesForm = (props) => {
    const {token,notes,handleNotes}=props
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error,setError]=useState({})

    const errorData={}

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleBody = (e) => {
        setBody(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError({})
         if (title.length === 0) {
            errorData.title="title can't be blank"
        }
        if (body.length === 0) {
            errorData.body="body can't be blank"
        }
        setError(errorData)
        if (Object.keys(errorData).length===0) {
            const formData = {
            title: title,
            body:body
        }
        addNote(formData)
        setTitle('')
        setBody('')
        }
        
    }

    const addNote = (formData) => {
        if (token) {
            const url = "http://dct-user-auth.herokuapp.com/api/notes"
            axios.post(url, formData,{headers:{'x-auth':token}})
            .then((res) => {
                handleNotes([res.data,...notes])
            })
                .catch((err) => {
                    swal(err.message)
                })
        } else {
            props.history.push('/')
        }    
    }

    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" value={title} onChange={handleTitle} /><br />
                {error.title && <div><span>{error.title}</span><br/></div>}
                <textarea placeholder="add some notes here..." value={body} onChange={handleBody} /><br />
                {
                    error.body && <div><span>{error.body}</span><br/></div>
                }
                <input type="submit" value="Add"/>
            </form>
        </>
    )
    
}
export default MyNotesForm
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../style/mynote.css'
import { Link } from 'react-router-dom'
import swal from "sweetalert"

const MyNotes = (props) => {
    const [token,setToken]=useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [notes, setNotes] = useState([])
    const [error,setError]=useState({})

    const errorData={}

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
                setNotes([res.data,...notes])
            })
                .catch((err) => {
                    swal(err.message)
                })
        } else {
            props.history.push('/')
        }    
    }

    const showDetail = (id) => {
        const url = `http://dct-user-auth.herokuapp.com/api/notes/${id}`
        axios.get(url, { headers: { "x-auth": token } })
            .then((res) => {
                const result=res.data
                swal(`${result.title}`, `note : ${result.body}`);
            })
            .catch((err) => {
                swal(err.message)
            })
    }

    const handleRemove = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const url = `http://dct-user-auth.herokuapp.com/api/notes/${id}`
                axios.delete(url, { headers: { "x-auth": token } })
                .then((res) => {
                    const result = notes.filter(note => {
                        return id !== note._id
                    })
                    setNotes(result)
                    swal("success! Your file has been deleted!", {
                    icon: "success",
                });
                })
                .catch((err) => {
                swal(err.message)
                })
                
            } else {
            swal("Your file is safe!");
            }
        });    
    }

    return (
        <div className="mynotes">
            <div className="notelist">
                <h3>My Notes</h3>
                {
                    notes.map(note => {
                        if (note.hasOwnProperty("_id")) {
                            return (
                                <div key={note._id}>
                                    <p><Link to="#" onClick={() => showDetail(note._id)}>{note.title}</Link>
                                    <button id="button" onClick={() => handleRemove(note._id)}>delete</button></p>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="noteform">
                <h3>Add Note</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="title" value={title} onChange={handleTitle} /><br />
                    {error.title && <div><span>{error.title}</span><br/></div>
                    }
                    <textarea placeholder="add some notes here..." value={body} onChange={handleBody} /><br />
                    {
                        error.body && <div><span>{error.body}</span><br/></div>
                    }
                    <input type="submit" value="Add"/>
                </form>
            </div>
        </div>
    )
}
export default MyNotes
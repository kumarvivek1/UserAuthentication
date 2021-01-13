import React from 'react'
import axios from 'axios'
import swal from "sweetalert"
import { Link } from 'react-router-dom'


const MyNotesList = (props) => {
    const { notes,token,handleNotes } = props

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
                    handleNotes(result)
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
        <div>
            {notes.length>0 ?(
            notes.map(note => {
                    return (
                        <div key={note._id}>
                            <b><Link to="#" onClick={() => showDetail(note._id)}>{note.title}</Link>
                            </b>
                            <button id="button" onClick={() => handleRemove(note._id)}>delete</button><hr />
                        </div>
                    )
            })) : (
                    <>
                    <h5>No notes available</h5>
                        <h5>Add some notes</h5>
                    </>
            )
            }
        </div>
    )

}
export default MyNotesList
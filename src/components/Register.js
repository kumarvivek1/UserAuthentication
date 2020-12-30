import React, {useState,useEffect } from 'react'
import Nav from './Nav'
import '../style/register.css'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const Register = (props) => {
    const {handleLogout}=props
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const [error, setError] = useState({})
    const [toggle, setToggle] = useState(false)
    
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("loginToken"))) {
             handleLogout()
        }  
     }, [])
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleRemove = () => {
        setFormData({ username: '', email: '', password: '' })
        setError({})
    }

    const handleSubmit =(e) => {
        e.preventDefault()
        const errorData = {}
        if (formData.username.length === 0) {
            errorData.username="username can't be blank"
        }

        if (formData.email.length === 0) {
            errorData.email="email can't be blank"
        } else if (!validateEmail(formData.email)) {
            errorData.email="enter valid email"
        }

        if (formData.password.length === 0) {
            errorData.password="password can't be blank"
        } else if (formData.password.length > 0 && (formData.password.length < 8 || formData.password.length > 128)) {
            errorData.password="password length must be between 8 to 128 character"
        }
        setError(errorData)

        if (Object.keys(errorData).length === 0) {
            const url = "http://dct-user-auth.herokuapp.com/users/register"
            
            axios.post(url, formData)
                .then((res) => {
                    console.log(res.data)
                    if (Object.keys(res.data)[0]!=="errors") {
                        swal("success!", "You have registered sucessfully!", "success");
                        setFormData({ username: '', email: '', password: '' })
                        setToggle(true)
                    } else {
                        setError({errors:"userName or email already exists"})
                    } 
                })
                .catch((err) => {
                    swal(err.message)
                })
        }
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    const handleError = (name) => {
        
    }

    return (
        <div className="register">
            <Nav/>
            <div className="regform">
                {error.errors && <span>{error.errors}</span>
                }
                <h3>Register here!</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={formData.username} onChange={handleChange} placeholder="UserName" name="username" /><br />
                    {
                        error.username && <div><span>{error.username}</span><br/></div>
                    }
                    <input type="text" value={formData.email} onChange={handleChange} placeholder="Email" name="email" /><br />
                    {
                        error.email && <div><span>{error.email}</span><br/></div>
                    }
                    <input type="password" value={formData.password} onChange={handleChange} placeholder="Password" name="password" /><br />
                    {
                        error.password && <div><span>{error.password}</span><br /></div>
                    }
                    {/*(formData.username.length===0 ||formData.email.length===0 || formData.password.length===0 || Object.keys(error).length!==0) ?(<input type="submit" value="Register" disabled/>):(<input type="submit" value="Register"/>)
                    */}
                    <input type="submit" value="Register"/>
                    <input type="button" value="cancel" onClick={handleRemove}/>
                </form>
                <p>Already have account? <Link to='/login'>Login</Link></p>
            </div>
            {
                toggle && <Redirect to="/login"/>
            }
        </div>
    )
}
export default Register
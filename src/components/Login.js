import React, { useEffect, useState } from 'react'
import '../style/login.css'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const Login = (props) => {
    const {handleLogin,handleLogout,message,handleMessage}=props
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [error, setError] = useState({})
    const history = useHistory()

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("loginToken"))) {
            handleLogout()
        }  
     }, [])
    
    const handleChange = (e) => {
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }
    const handleRemove = () => {
        setLoginData({ email: '', password: '' })
        setError({})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const errData = {}

        if (loginData.email.length === 0) {
            errData.email="email can't be blank"
        }
        if (loginData.password.length === 0) {
            errData.password="password can't be blank"
        } else if (loginData.password.length > 0 && (loginData.password.length < 8 || loginData.password.length > 128)) {
            errData.password="password length must be between 8 to 128 character"
        }
        setError(errData)
        if (Object.keys(errData).length === 0) {
            const url = "http://dct-user-auth.herokuapp.com/users/login"
            axios.post(url, loginData)
                .then((res) => {
                    if (Object.keys(res.data)[0]==="errors") {
                        setError({ status: res.data })
                    } else if (Object.keys(res.data)[0]==="token") {
                        localStorage.setItem("loginToken", JSON.stringify(res.data))
                        handleLogin()
                        handleMessage("You have logged in successfully!")
                        history.push("/")
                    }
                })
                .catch((err) => {
                    swal(err.message)
                })
        }
    }
    
    return (
        <div className="login">
            {
                message && <h4 id='message'>{message}</h4>
            }
            <div className="loginform">
                {
                    error.status && <span>{error.status.errors}</span>
                }
                <h3>Login to your account!</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={loginData.email} onChange={handleChange} placeholder="email" name="email" /><br />
                     {
                        error.email && <div><span>{error.email}</span><br /></div>
                    }
                    <input type="password" value={loginData.password} onChange={handleChange} placeholder="Password" name="password" /><br />
                     {
                        error.password && <div><span>{error.password}</span><br /></div>
                    }
                    <input type="submit" value="Login" />
                    <input type="button" value="cancel" onClick={handleRemove}/>
                </form>
                <p>Don't have Account ? <Link to='/register'>Register here</Link></p>
            </div>
        </div>
    )
}
export default Login
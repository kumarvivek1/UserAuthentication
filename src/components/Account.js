import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../style/account.css'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

const Account = (props) => {
    const {handleLogin } = props
    const [userData, setUserData] = useState({})
    const history = useHistory()
    
    useEffect(() => {
        const tokenValue = JSON.parse(localStorage.getItem("loginToken"))
        if (tokenValue) {
            const url = "http://dct-user-auth.herokuapp.com/users/account"
        axios.get(url, { headers: { 'x-auth': tokenValue.token } })
            .then((res) => {
                setUserData(res.data)
                handleLogin()
            })
            .catch((err) => {
                history.push("/login")
                swal("you need to login first")
            })
        } else {
            history.push("/login")
            swal("you need to login first")
        }
        
    }, [])
    
    return (
        <div>
            <div className="showUser">
                <h4>{userData.username}</h4>
                <h4>{userData.email}</h4>
                <h4>{userData.createdAt}</h4>
                <h4>{userData._id}</h4>
            </div>
        </div>
     )
}
export default Account
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Account = (props) => {
    const {handleMessage} = props
    const [userData, setUserData] = useState({})
    const history = useHistory()
    
    useEffect(() => {
        const tokenValue = JSON.parse(localStorage.getItem("loginToken"))
        if (tokenValue) {
            const url = "http://dct-user-auth.herokuapp.com/users/account"
        axios.get(url, { headers: { 'x-auth': tokenValue.token } })
            .then((res) => {
                setUserData(res.data)
            })
            .catch((err) => {
                history.push("/login")
                handleMessage("you need to login first. Please login here!")
            })
        } else {
            history.push("/login")
            handleMessage("you need to login first. Please login here!")
        }
        
    },[])
    
    return (
            <div className="showUser">
                <h4>Name : {userData.username}</h4>
                <h4>Email : {userData.email}</h4>
                <h4>Created at : {userData.createdAt}</h4>
                <h4>Id : {userData._id}</h4>
            </div>
     )
}
export default Account
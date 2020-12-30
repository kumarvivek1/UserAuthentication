import React, { useEffect } from 'react'
import Nav from './Nav'
import '../style/home.css'
import img from '../img.jpg'



const Home = (props) => {
    const { isLoggedIn, handleLogout,handleLogin} = props
    
    useEffect(() => {
        const tokenValue = JSON.parse(localStorage.getItem("loginToken"))
        if (tokenValue) {
            handleLogin()
        }
    },[])

    return (
        <div>
            <div className="home">
                <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>  
            </div>
            <div className="logo">
                <img src={img} alt="imagehere" />
            </div>
            <div className="content">
                <div className="leftcontent">
                    <p><b>User authentication is the verification of an active human-to-machine transfer of credentials required for confirmation of a user's authenticity; the term contrasts with machine authentication, which involves automated processes that do not require user input.</b>
                    </p>
                </div>
                <div className="rightcontent">
                    <p><b>Authorization is a process by which a server determines if the client has permission to use a resource or access a file. Authorization is usually coupled with authentication so that the server has some concept of who the client is that is requesting access.</b>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Home
import React from 'react'
import { useSelector } from 'react-redux'
import  CarouselImg  from './carousel'


const Home = (props) => {
    const message=useSelector((state)=>state.message)

    return (
        <div className="home">
            {
                message && <h4 id='message'>{message}</h4>
            }
            <div className="logo">
                <CarouselImg />
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
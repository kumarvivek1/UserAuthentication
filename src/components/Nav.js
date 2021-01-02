import React from 'react'
import { Link } from 'react-router-dom'
import "../style/nav.css"

const Nav = (props) => {
    const{isLoggedIn,handleLogout}=props
    return (
        <div>
            <h2>User Authentication</h2>
            <div className="nav">
                {isLoggedIn ? (
                        <ul>
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/account"><li>Account</li></Link>
                            <Link to="/" onClick={handleLogout}><li>Logout</li></Link>
                        </ul>
                    ): (
                    <ul>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/register"><li>Register</li></Link>
                        <Link to="/login"><li>Login</li></Link>
                    </ul>
                ) 
            }
            </div>
        </div>
        
    )
}
export default Nav
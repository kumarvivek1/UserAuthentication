import React from 'react'
import { Link } from 'react-router-dom'
import "../style/nav.css"

const Nav = (props) => {
    const{isLoggedIn,handleLogout}=props
    return (
        <div>
            <h2>User Auth</h2>
            <div className="nav">
                {isLoggedIn ? (
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/account">Account</Link></li>
                            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    ): (
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                ) 
            }
            </div>
        </div>
        
    )
}
export default Nav
import React, { useEffect } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Home from './Home';
import Register from './Register';
import Login from './Login'
import Account from './Account'
import MyNotes from './mynotes/MyNotes'
import { setMessage } from '../redux-store/action/message.action'
import { setLogin } from '../redux-store/action/login.action'
import "../style/nav.scss"

const Nav = (props) => {
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (localStorage.getItem('loginToken')) {
            dispatch(setLogin())
        }   
    },[])
    return (
        <div>
            <div className="nav">
                <h2>User Authentication</h2>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/account"><li>Account</li></Link>
                            <Link to="/mynotes"><li>MyNotes</li></Link>
                            <Link to="/" onClick={() => {
                                localStorage.removeItem('loginToken')
                                dispatch(setLogin())
                                dispatch(setMessage('successfully logged out!'))
                                setTimeout(() => {
                                    dispatch(setMessage(''))
                                }, 3000)
                                props.history.push('/')
                            }}><li>Logout</li></Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register"><li>Register</li></Link>
                            <Link to="/login"><li>Login</li></Link>
                        </>
                       ) 
                    }
                </ul>
            </div>

            <Route path="/" exact render={(props) => {
                return (
                    <Home {...props}/>
                )
            }} />

            <Route path="/register" render={(props) => {
                return (
                    <Register {...props}  />
                )
            }} />

            <Route path="/login" render={(props) => {
                return (
                    <Login {...props} />
                )
            }} />

            <Route path="/account" render={(props) => {
                return (
                    <Account {...props} /> 
                )
            }} />

            <Route path="/mynotes" render={(props) => {
                return (
                    <MyNotes {...props} />
                )
            }} /> 
            
        </div> 
    )
}
export default withRouter(Nav)
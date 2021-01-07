import React,{useState} from 'react'
import { Link,Route,withRouter } from 'react-router-dom'
import Home from './Home';
import Register from './Register';
import Login from './Login'
import Account from './Account'
import MyNotes from './MyNotes'
import "../style/nav.css"

const Nav = (props) => {
    const { isLoggedIn, handleLogin} = props
    const [message, setMessage] = useState('')


  const handleMessage = (val) => {
    setMessage(val)
    setTimeout(() => {
      setMessage('')
    },3000)
    }
    
    return (
        <div>
            
            <div className="nav">
                <h2>User Authentication</h2>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    {isLoggedIn ? (
                        <React.Fragment>
                            <Link to="/account"><li>Account</li></Link>
                            <Link to="/mynotes"><li>MyNotes</li></Link>
                            <Link to="/" onClick={() => {
                                localStorage.removeItem('loginToken')
                                handleLogin()
                                handleMessage('successfully logged out!')
                                props.history.push('/')
                            }}><li>Logout</li></Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to="/register"><li>Register</li></Link>
                            <Link to="/login"><li>Login</li></Link>
                        </React.Fragment>
                       ) 
                    }
                </ul>
            </div>
            <Route path="/" exact render={() => {
        return (
            <Home message={message}/>
        )
      }
      } />
      <Route path="/register" render={(props) => {
        return (
            <Register {...props}  handleMessage={handleMessage}/>
        )
      }} />
      <Route path="/login" render={(props) => {
        return (
            <Login {...props} handleLogin={handleLogin}  message={message} handleMessage={handleMessage}/>
        )
      }} />
      <Route path="/account" render={(props) => {
        return (
            <Account {...props} handleMessage={handleMessage}/> 
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
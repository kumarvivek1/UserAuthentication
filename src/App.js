import React,{useState,useEffect} from 'react'
import './style/App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login'
import Account from './components/Account'
import Nav from './components/Nav'
import {Route} from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tokenValue,setTokenValue]=useState({})

  const handleLogin = () => {
    setIsLoggedIn(true)
    const tokenD = JSON.parse(localStorage.getItem("loginToken"))
    if (tokenD) {
      setTokenValue(tokenD)
    }
  }
  
  const handleLogout = () => {
    const tokenData = JSON.parse(localStorage.getItem("loginToken"))
    const url = "http://dct-user-auth.herokuapp.com/users/logout"

    axios.delete(url, { headers: { 'x-auth':tokenData.token} })
      .then((res) => {
        if (Object.keys(res.data)[0] === 'notice') {
          swal("logged out")
          localStorage.removeItem("loginToken")
          setIsLoggedIn(false)
        }
      })
      .catch((err) => {
        swal(err.message)
      })
        
    }
  
  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Route path="/" exact render={() => {
        return (
          <div>
            <Home handleLogin={handleLogin}/>
          </div>
        )
      }
      } />
      <Route path="/register" render={() => {
        return (
          <div>
            <Register handleLogout={handleLogout}/>
          </div>
        )
      }} />
      <Route path="/login" render={() => {
        return (
          <div>
            <Login handleLogin={handleLogin} handleLogout={handleLogout}/>
          </div>
        )
      }} />
      <Route path="/account" render={() => {
        return (
          <div>
            <Account tokenValue={tokenValue} handleLogin={handleLogin}/> 
          </div>
        )
      }
      } />
    </div>
  );
}

export default App;

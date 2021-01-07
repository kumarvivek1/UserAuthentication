import React,{useState,useEffect} from 'react'
import './style/App.css';
import Nav from './components/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (val) => {
      setIsLoggedIn(!isLoggedIn)
  }
  useEffect(() => {
        const result = localStorage.getItem("loginToken")
        if(result)
          handleLogin()
    },[])
  
  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>
    </div>
  );
}

export default App;

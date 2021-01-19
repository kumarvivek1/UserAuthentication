import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setMessage } from '../redux-store/action/message.action'
import { fetchUser } from '../redux-store/action/user.action'

const Account = (props) => {
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user)
    const history = useHistory()
    
    useEffect(() => {
        const tokenValue = JSON.parse(localStorage.getItem("loginToken"))
        if (tokenValue) {
            dispatch(fetchUser())
        } else {
            history.push("/login")
            dispatch(setMessage("you need to login first. Please login here!"))
            setTimeout(() => {
                dispatch(setMessage(''))
            }, 3000)
        }
        
    },[])
    
    return (
            <div className="showUser">
                <h4>Name : {user.username}</h4>
                <h4>Email : {user.email}</h4>
                <h4>Created at : {user.createdAt}</h4>
                <h4>Id : {user._id}</h4>
            </div>
     )
}
export default Account
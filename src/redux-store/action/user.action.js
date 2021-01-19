import axios from 'axios'

const setUser = (user) => {
    return {type:'SET_USER',payload:user}
}

export const fetchUser = () => {
    return (dispatch)=>{
        const url = "http://dct-user-auth.herokuapp.com/users/account"
        const tokenValue=JSON.parse(localStorage.getItem('loginToken'))
        axios.get(url, { headers: { 'x-auth': tokenValue.token } })
            .then((res) => {
                dispatch(setUser(res.data))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
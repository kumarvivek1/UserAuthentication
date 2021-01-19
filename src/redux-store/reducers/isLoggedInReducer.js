
const initialLoggedIn = false

const isLoggedInReducer = (state=initialLoggedIn, action) => {
    switch (action.type) {
        case 'SET_LOGIN': {
            return !state
        }
        default: {
            return state
        }
    }
}
export default isLoggedInReducer
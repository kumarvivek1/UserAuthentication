import { createStore, combineReducers, applyMiddleware } from 'redux'
import isLoggedInReducer from '../reducers/isLoggedInReducer'
import messageReducer from '../reducers/messageReducer'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'

const configStore = () => {
    const store = createStore(combineReducers({
        isLoggedIn: isLoggedInReducer,
        message: messageReducer,
        user:userReducer,
    }),applyMiddleware(thunk))

    return store
}
export default configStore
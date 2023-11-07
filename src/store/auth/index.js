import { combineReducers } from "redux";
import session from './sessionSlice'
import user from './userSlice'


const reducer = combineReducers({
    session,
    user,
})

export default reducer
import { combineReducers } from 'redux'

//Screens
import Home from './Home'
import Launch from './Launch'
import Login from './Login'
import Signup from './Signup'

//Reducers
import signupReducer from './Signup/reducer'

export{
    Home,
    Launch,
    Login,
    Signup
}

export const rootReducer = combineReducers({
    signupReducer
})
import { actionTypes } from '../../util'
const initialState = {
    //Signup
    signupEmail: '',
    signupPassword: '',
    user: ''
}

signupReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_SIGNUP_EMAIL:
            return { ...state, signupEmail: action.email }
        case actionTypes.UPDATE_SIGNUP_PASSWORD:
            return { ...state, signupPassword: action.password }
        case  actionTypes.USER_SIGNUP:
            return { ...state, signupEmail: '', signupPassword: '', user: action.user }
        default:
            return state
    }
}
export default signupReducer
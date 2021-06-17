import { actionTypes } from '../../util'
const initialState = {
    //Signup
    loginEmail: '',
    loginPassword: '',
    user: ''
}

loginReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_LOGIN_EMAIL:
            return { ...state, loginEmail: action.email }
        case actionTypes.UPDATE_LOGIN_PASSWORD:
            return { ...state, loginPassword: action.password }
        case  actionTypes.USER_LOGIN:
            return { ...state, loginEmail: '', loginPassword: '', user: action.user }
        default:
            return state
    }
}
export default loginReducer
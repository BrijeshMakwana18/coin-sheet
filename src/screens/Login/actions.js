import auth from '@react-native-firebase/auth'
import { actionTypes } from '../../util'

export const updateEmail = (email) => {
    return(dispatch) => {
        dispatch({type: actionTypes.UPDATE_LOGIN_EMAIL, email: email})
    }
}

export const updatePassword = (password) => {
    return(dispatch) => {
        dispatch({type: actionTypes.UPDATE_LOGIN_PASSWORD, password: password})
    }
}

export const login = () => {
    return async(dispatch,getState) => {
        const { loginEmail, loginPassword } = getState().loginReducer
        await auth()
        .signInWithEmailAndPassword(loginEmail,loginPassword)
        .then(async(res)=>{
            console.log(res)
            await dispatch({type: actionTypes.USER_LOGIN, user: res})
        })
        .catch(async(err)=> {
           alert(loginEmail + ' ' + loginPassword)
        })
    }   
}
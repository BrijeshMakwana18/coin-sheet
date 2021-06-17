import auth from '@react-native-firebase/auth'
import { actionTypes } from '../../util'

export const updateEmail = (email) => {
    return(dispatch) => {
        dispatch({type: actionTypes.UPDATE_SIGNUP_EMAIL, email: email})
    }
}

export const updatePassword = (password) => {
    return(dispatch) => {
        dispatch({type: actionTypes.UPDATE_SIGNUP_PASSWORD, password: password})
    }
}

export const signup = () => {
    return async(dispatch,getState) => {
        const { signupEmail, signupPassword } = getState().signupReducer
        await auth()
        .createUserWithEmailAndPassword(signupEmail,signupPassword)
        .then(async(res)=>{
            console.log(res)
            await dispatch({type: actionTypes.USER_SIGNUP, user: res})
        })
        .catch(async(err)=> {
           await console.log(err)
        })
    }   
}
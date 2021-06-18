import { actionTypes } from '../../util'

export const signup = (user) => {
    return async(dispatch) => {
        dispatch({type: actionTypes.USER_SIGNUP, user: user})
    }   
}
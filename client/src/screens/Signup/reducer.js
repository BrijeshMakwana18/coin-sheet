/* eslint-disable no-undef */
import {actionTypes} from '../../util';
const initialState = {
  //Signup
  user: '',
};

signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNUP:
      return {...state, user: action.user};
    default:
      return state;
  }
};
export default signupReducer;

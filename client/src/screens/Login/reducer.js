/* eslint-disable no-undef */
import {actionTypes} from '../../util';
const initialState = {
  //Login
  user: '',
};

loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {...state, user: action.user};
    default:
      return state;
  }
};
export default loginReducer;

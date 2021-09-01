/* eslint-disable no-undef */
import {actionTypes} from '../../util';
const initialState = {
  user: {},
};

appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
export default appReducer;

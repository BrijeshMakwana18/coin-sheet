/* eslint-disable no-undef */
import {actionTypes} from '../../util';
const initialState = {
  user: {},
  allExpenses: {},
  allIncome: {},
};

appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return {...state, user: action.payload};
    case actionTypes.SET_ALL_EXPENSES:
      return {...state, allExpenses: action.payload};
    case actionTypes.SET_ALL_INCOME:
      return {...state, allIncome: action.payload};
    default:
      return state;
  }
};
export default appReducer;

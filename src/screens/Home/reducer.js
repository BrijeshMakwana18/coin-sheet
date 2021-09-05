/* eslint-disable no-undef */
import {actionTypes} from '../../util';
const initialState = {
  user: {},
  allExpenses: [],
  allIncome: [],
  totalExpenses: 0,
  totalIncome: 0,
  totalExpensesByCategoty: [],
  allTransactions: [],
};

appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return {...state, user: action.payload};
    case actionTypes.SET_ALL_INCOME:
      return {...state, allIncome: action.payload};
    case actionTypes.SET_ALL_EXPENSES:
      return {...state, allExpenses: action.payload};
    case actionTypes.SET_TOTAL_INCOME:
      return {...state, totalIncome: action.payload};
    case actionTypes.SET_TOTAL_EXPENSES:
      return {...state, totalExpenses: action.payload};
    case actionTypes.SET_TOTAL_EXPENSES_CAT:
      return {...state, totalExpensesByCategoty: action.payload};
    case actionTypes.SET_ALL_TRANSACTIONS:
      return {...state, allTransactions: action.payload};
    default:
      return state;
  }
};
export default appReducer;

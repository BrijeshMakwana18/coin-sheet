/* eslint-disable no-undef */
import {actionTypes} from '../../util';
const initialState = {
  user: {},
  allIncome: [],
  allExpenses: [],
  totalIncome: 0,
  totalExpenses: 0,
  totalExpensesByCategoty: [],
  allTransactions: [],
  //Custom
  customAllIncome: [],
  customAllExpenses: [],
  customTotalIncome: 0,
  customTotalExpenses: 0,
  customTotalExpensesByCategoty: [],
  customAllTransactions: [],
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

    case actionTypes.SET_CUSTOM_ALL_INCOME:
      return {...state, customAllIncome: action.payload};
    case actionTypes.SET_CUSTOM_ALL_EXPENSES:
      return {...state, customAllExpenses: action.payload};
    case actionTypes.SET_CUSTOM_TOTAL_INCOME:
      return {...state, customTotalIncome: action.payload};
    case actionTypes.SET_CUSTOM_TOTAL_EXPENSES:
      return {...state, customTotalExpenses: action.payload};
    case actionTypes.SET_CUSTOM_TOTAL_EXPENSES_CAT:
      return {...state, customTotalExpensesByCategoty: action.payload};
    case actionTypes.SET_CUSTOM_ALL_TRANSACTIONS:
      return {...state, customAllTransactions: action.payload};
    default:
      return state;
  }
};
export default appReducer;

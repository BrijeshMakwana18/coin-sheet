import {actionTypes} from '../../util';

export const setUserData = user => {
  return dispatch => {
    dispatch({type: actionTypes.SET_USER_DATA, payload: user});
  };
};

export const setUserExpenses = expenses => {
  return dispatch => {
    dispatch({type: actionTypes.SET_ALL_EXPENSES, payload: expenses});
  };
};

export const setUserIncome = income => {
  return dispatch => {
    dispatch({type: actionTypes.SET_ALL_INCOME, payload: income});
  };
};

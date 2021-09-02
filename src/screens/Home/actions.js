import {actionTypes} from '../../util';

export const setUserData = user => {
  return dispatch => {
    dispatch({type: actionTypes.SET_USER_DATA, payload: user});
  };
};

export const setUserIncome = income => {
  return dispatch => {
    dispatch({type: actionTypes.SET_ALL_INCOME, payload: income});
  };
};

export const setUserExpenses = expenses => {
  return dispatch => {
    dispatch({type: actionTypes.SET_ALL_EXPENSES, payload: expenses});
  };
};

export const setTotalIncome = totalIncome => {
  return dispatch => {
    dispatch({type: actionTypes.SET_TOTAL_INCOME, payload: totalIncome});
  };
};

export const setTotalExpenses = totalExpenses => {
  return dispatch => {
    dispatch({type: actionTypes.SET_TOTAL_EXPENSES, payload: totalExpenses});
  };
};

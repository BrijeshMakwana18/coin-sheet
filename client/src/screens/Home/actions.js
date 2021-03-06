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
export const setTotalExpensesByCat = totalExpensesByCat => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_TOTAL_EXPENSES_CAT,
      payload: totalExpensesByCat,
    });
  };
};
export const setAllTransactions = allTransactions => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_ALL_TRANSACTIONS,
      payload: allTransactions,
    });
  };
};

export const setCustomUserIncome = income => {
  return dispatch => {
    dispatch({type: actionTypes.SET_CUSTOM_ALL_INCOME, payload: income});
  };
};

export const setCustomUserExpenses = expenses => {
  return dispatch => {
    dispatch({type: actionTypes.SET_CUSTOM_ALL_EXPENSES, payload: expenses});
  };
};

export const setCustomTotalIncome = totalIncome => {
  return dispatch => {
    dispatch({type: actionTypes.SET_CUSTOM_TOTAL_INCOME, payload: totalIncome});
  };
};

export const setCustomTotalExpenses = totalExpenses => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CUSTOM_TOTAL_EXPENSES,
      payload: totalExpenses,
    });
  };
};
export const setCustomTotalExpensesByCat = totalExpensesByCat => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CUSTOM_TOTAL_EXPENSES_CAT,
      payload: totalExpensesByCat,
    });
  };
};
export const setCustomAllTransactions = allTransactions => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_CUSTOM_ALL_TRANSACTIONS,
      payload: allTransactions,
    });
  };
};

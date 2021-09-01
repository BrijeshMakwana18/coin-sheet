import {actionTypes} from '../../util';

export const setUserData = user => {
  return dispatch => {
    dispatch({type: actionTypes.SET_USER_DATA, payload: user});
  };
};

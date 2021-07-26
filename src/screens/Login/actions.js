import {actionTypes} from '../../util';

export const login = user => {
  return async dispatch => {
    await dispatch({type: actionTypes.USER_LOGIN, user: user});
  };
};

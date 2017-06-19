import axios from 'axios';
import * as c from '../actions/actionTypes';

export const createUser = user => ({ type: c.CREATE_USER, user });

export const logoutUser = () => ({ type: c.LOGOUT });
export const logout = () => (dispatch) => {
  window.localStorage.removeItem('token');
  dispatch(logoutUser());
};

export const loginUser = user => ({ type: c.LOGIN, user });

export const login = userData => (dispatch) => {
  dispatch(loginUser(userData));
  return (
    request
      .post('/api/users/login')
      .send(userData)
      .then((response) => {
        window.localStorage.setItem('token', response.body.token);
        dispatch(loginSuccessful(response.body));
      })
      .catch((error) => {
        dispatch(loginFailed(error.response));
      })
  );
};

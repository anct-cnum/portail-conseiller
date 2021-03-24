import { userService } from '../services/user.service.js';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  choosePassword,
  verifyToken,
};

function login(username, password, to = null) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
    .then(
      data => {
        data.user.role = data.user.roles[0];
        delete data.user.roles;
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(success(data));
        if (to === null) {
          history.push('/');
        } else {
          history.push(to);
        }
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: 'LOGIN_REQUEST', user };
  }
  function success(user) {
    return { type: 'LOGIN_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'LOGIN_FAILURE', error };
  }
}

function logout() {
  userService.logout();
  return { type: 'LOGOUT' };
}

function choosePassword(token, password) {
  return dispatch => {
    dispatch(request(token));

    userService.choosePassword(token, password)
    .then(
      user => {
        user.role = user.roles[0];
        delete user.roles;
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'CHOOSE_PASSWORD_REQUEST', token };
  }
  function success(user) {
    return { type: 'CHOOSE_PASSWORD_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'CHOOSE_PASSWORD_FAILURE', error };
  }
}

function verifyToken(token) {
  return dispatch => {
    dispatch(request(token));

    userService.verifyToken(token)
    .then(
      user => {
        user.role = user.roles[0];
        delete user.roles;
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'VERIFY_TOKEN_REQUEST', token };
  }
  function success(user) {
    return { type: 'VERIFY_TOKEN_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'VERIFY_TOKEN_FAILURE', error };
  }
}

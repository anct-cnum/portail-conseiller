import { userService } from '../services/user.service.js';
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  choosePassword,
  verifyToken,
  checkForgottenPasswordEmail,
  forgottenPassword,
  choosePasswordMailBox
};

function login(username, password, to) {
  return dispatch => {
    dispatch(request({ username }));
    userService.login(username, password)
    .then(
      data => {
        data.user = getRole(data.user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(success(data));
        if (to.pathname === '/') {
          history.push('/accueil');
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

function choosePassword(token, password, typeEmail) {
  return dispatch => {
    dispatch(request(token));
    userService.choosePassword(token, password, typeEmail)
    .then(
      user => {
        user = getRole(user);
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
        user = getRole(user);
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

function checkForgottenPasswordEmail(username) {
  return dispatch => {
    dispatch(request({ username }));
    userService.checkForgottenPasswordEmail(username)
    .then(
      response => {
        dispatch(success(response));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: 'CHECK_EMAIL_REQUEST', user };
  }
  function success(response) {
    return { type: 'CHECK_EMAIL_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'CHECK_EMAIL_FAILURE', error };
  }
}

function forgottenPassword(username) {
  return dispatch => {
    dispatch(request({ username }));
    userService.sendForgottenPasswordEmail(username)
    .then(
      response => {
        dispatch(success(response));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: 'SEND_EMAIL_REQUEST', user };
  }
  function success(response) {
    return { type: 'SEND_EMAIL_SUCCESS', response };
  }
  function failure(error) {
    return { type: 'SEND_EMAIL_FAILURE', error };
  }
}

function getRole(user) {
  user.role = user.roles[0];
  if (user.roles.includes('admin_coop')) {
    user.role = 'admin_coop';
  }
  delete user.roles;
  return user;
}

function choosePasswordMailBox(token, password) {
  return dispatch => {
    dispatch(request(token));
    userService.choosePasswordMailBox(token, password)
    .then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(token) {
    return { type: 'CHOOSE_PASSWORD_MAILBOX_REQUEST', token };
  }
  function success(user) {
    return { type: 'CHOOSE_PASSWORD_MAILBOX_SUCCESS', user };
  }
  function failure(error) {
    return { type: 'CHOOSE_PASSWORD_MAILBOX_FAILURE', error };
  }
}

export const userService = {
  login,
  logout,
  choosePassword,
  verifyToken,
  checkForgottenPasswordEmail,
  sendForgottenPasswordEmail,
  choosePasswordMailBox,
  verifyCode
};

function login(username, password) {

  const strategy = import.meta.env.VITE_APP_STRATEGYAUTH;
  const apiUrlAuth = `${import.meta.env.VITE_APP_API}/authentication`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'strategy': strategy,
      'name': username,
      'password': password
    })
  };

  return fetch(apiUrlAuth, requestOptions)
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('suspension_permanence');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      if (data?.data?.resetPasswordCnil && data.message === 'RESET_PASSWORD_CNIL') {
        return Promise.reject({ resetPasswordCnil: true });
      }
      if (data?.data?.attemptFail && data.message === 'ERROR_ATTEMPT_LOGIN') {
        return Promise.reject({ attemptFail: data?.data?.attemptFail });
      }
      if (data?.data?.openPopinVerifyCode && data.message === 'PROCESS_LOGIN_UNBLOCKED') {
        return Promise.reject({ openPopinVerifyCode: data?.data?.openPopinVerifyCode });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    //cas vérification email pour
    //mot de passe oublié
    if (data?.successCheckEmail) {
      return data;
    }
    //cas mot de passe oublié
    if (data?.successResetPassword) {
      return data;
    }
    // dans le cas où le conseiller recréer son email @conseiller-numerque.fr
    if (data?.messageCreationMail) {
      return data;
    }
    // dans le cas où le conseiller a bien rempli le formulaire de vérification
    if (data?.messageVerificationCode) {
      return data;
    }
    //login and verify token data !== conseiller
    let roles = [];
    if (data?.user?.roles) {
      roles = data?.user?.roles;
    }
    if (data?.roles) {
      roles = data?.roles;
    }
    const rolesAllowed = ['conseiller', 'admin_coop', 'hub_coop'];
    if (rolesAllowed.filter(role => roles.includes(role)).length === 0) {
      logout();
      const roleNotAllowed = roles.find(role => ['admin', 'structure', 'hub'].includes(role));
      if (roleNotAllowed) {
        window.location.href = `/login?role=${roleNotAllowed}`;
      }
      return Promise.reject({ error: 'Vous n\'avez pas accès à cette application' });
    }
    if (data.user?.passwordCreated === false) {
      logout();
      return Promise.reject({ errorActivation: true });
    }
    return data;
  });
}

function choosePassword(token, password, typeEmail) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'typeEmail': typeEmail
    })
  };

  let uri = `${apiUrlRoot}/users/choosePassword/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function verifyToken(token) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;
  const requestOptions = {
    method: 'GET'
  };

  let uri = `${apiUrlRoot}/users/verifyToken/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function checkForgottenPasswordEmail(username) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'username': username
    })
  };

  let uri = `${apiUrlRoot}/users/checkForgottenPasswordEmail`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function sendForgottenPasswordEmail(username) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'username': username
    })
  };

  let uri = `${apiUrlRoot}/users/sendForgottenPasswordEmail`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function choosePasswordMailBox(token, password) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'password': password })
  };

  let uri = `${apiUrlRoot}/users/changement-email-pro/${token}`;
  return fetch(uri, requestOptions).then(handleResponse);
}

function verifyCode(code, email) {
  const apiUrlRoot = import.meta.env.VITE_APP_API;

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code, email
    })
  };

  let uri = `${apiUrlRoot}/users/verify-code`;
  return fetch(uri, requestOptions).then(handleResponse);
}

export const userService = {
  login,
  logout,
};

function login(username, password) {

  const strategy = process.env.REACT_APP_STRATEGYAUTH;
  const apiUrlAuth = `${process.env.REACT_APP_API}/authentication`;

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
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        return Promise.reject({ error: 'Identifiants incorrects' });
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    if (data.user.roles[0] !== 'conseiller') {
      logout();
      return Promise.reject({ error: 'Identifiants incorrects' });
    }

    return data;
  });
}

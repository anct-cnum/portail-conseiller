export const userService = {
  login,
  logout,
};

function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = { username };
      if (username === 'test' && password === 'test') {
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject({ error: 'Indentifiants incorrects' });
      }
    }, 1000);
  });
}

function logout() {
  localStorage.removeItem('user');
}

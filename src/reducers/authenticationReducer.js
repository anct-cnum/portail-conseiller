let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      };
    case 'LOGIN_FAILURE':
      return {
        error: action.error
      };
    case 'LOGOUT':
      return {};
    default:
      return state
  }
}

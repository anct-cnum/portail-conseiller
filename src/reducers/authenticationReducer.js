let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, loading: false } : {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loading: true,
        loggingIn: false,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        loading: false,
        loggedIn: true,
        user: action.user
      };
    case 'LOGIN_FAILURE':
      return {
        loading: false,
        error: action.error,
        loggingIn: false,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}

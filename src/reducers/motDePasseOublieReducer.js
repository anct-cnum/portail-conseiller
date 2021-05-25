export default function motDePasseOublie(state = [], action) {
  switch (action.type) {
    case 'SEND_EMAIL_SUCCESS':
      return {
        user: action.user
      };
    case 'SEND_EMAIL_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}

export default function motDePasseOublie(state = [], action) {
  switch (action.type) {
    case 'SEND_EMAIL_SUCCESS':
      return {
        success: action.response.successResetPassword
      };
    case 'SEND_EMAIL_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}

export default function checkMotDePasseOublie(state = [], action) {
  switch (action.type) {
    case 'CHECK_EMAIL_SUCCESS':
      return {
        hiddenEmail: action.response.hiddenEmail,
        success: action.response.successCheckEmail
      };
    case 'CHECK_EMAIL_FAILURE':
      return {
        error: action.error
      };
    default:
      return state;
  }
}

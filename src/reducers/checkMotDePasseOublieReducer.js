const initialState = {
  loading: false,
  error: null
};
export default function checkMotDePasseOublie(state = initialState, action) {
  switch (action.type) {
    case 'CHECK_EMAIL_REQUEST':
      return {
        loading: true,
        error: null
      };
    case 'CHECK_EMAIL_SUCCESS':
      return {
        loading: false,
        hiddenEmail: action.response.hiddenEmail,
        success: action.response.successCheckEmail
      };
    case 'CHECK_EMAIL_FAILURE':
      return {
        loading: false,
        error: action.error.message ?? action.error
      };
    default:
      return state;
  }
}

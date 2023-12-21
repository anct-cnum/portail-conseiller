const initialState = {
  loading: false,
  error: null
};

export default function motDePasseOublie(state = initialState, action) {
  switch (action.type) {
    case 'SEND_EMAIL_REQUEST':
      return {
        loading: true,
        error: null
      };
    case 'SEND_EMAIL_SUCCESS':
      return {
        success: action.response.successResetPassword,
        loading: false
      };
    case 'SEND_EMAIL_FAILURE':
      return {
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}

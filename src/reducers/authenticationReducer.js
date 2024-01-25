let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  user
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loading: true,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        loading: false,
        user: action.user
      };
    case 'LOGIN_FAILURE':
      return {
        loading: false,
        error: action.error,
      };
    case 'LOGOUT':
      return {};
    case 'VERIFY_CODE_CONNEXION_REQUEST':
      return {
        ...state,
        verifyingCode: true,
        messageCodeVerified: '',
        errorVerifyingCode: '',
      };
    case 'VERIFY_CODE_CONNEXION_SUCCESS':
      return {
        ...state,
        verifyingCode: false,
        messageCodeVerified: action.result.messageVerificationCode,
      };
    case 'VERIFY_CODE_CONNEXION_FAILURE':
      return {
        ...state,
        verifyingCode: false,
        errorVerifyingCode: action.error,
      };
    default:
      return state;
  }

}

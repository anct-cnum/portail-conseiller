export default function authentication(state = {}, action) {
  switch (action.type) {
    case 'VERIFY_TOKEN_REQUEST':
      return {
        verifyingToken: true,
        user: action.user
      };
    case 'VERIFY_TOKEN_SUCCESS':
      return {
        tokenVerified: true,
        user: action.user
      };
    case 'VERIFY_TOKEN_FAILURE':
      return {
        tokenVerified: false,
        error: action.error
      };
    case 'CHOOSE_PASSWORD_REQUEST':
      return {
        choosingPassword: true,
        user: action.user
      };
    case 'CHOOSE_PASSWORD_SUCCESS':
      return {
        passwordChoosen: true,
        user: action.user
      };
    case 'CHOOSE_PASSWORD_FAILURE':
      return {
        passwordChoosen: false,
        error: action.error
      };
    default:
      return state;
  }
}

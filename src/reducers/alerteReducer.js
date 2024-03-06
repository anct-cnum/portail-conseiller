const initialState = {
  type: null,
  message: null,
  description: null,
  icon: null
};
export default function alerte(state = initialState, action) {
  switch (action.type) {
    case 'GET_MESSAGE_ALERTE':
      return {
        alerte: action.alerte
      };
    case 'RESET_MESSAGE_ALERTE':
      return initialState;
    default:
      return state;
  }
}

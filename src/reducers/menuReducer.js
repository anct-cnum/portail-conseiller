const initialState = {
  hiddenMenu: true,
  expandNav: false,
};

export default function menu(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        hiddenMenu: !state.hiddenMenu,
      };
    case 'TOGGLE_NAV':
      return {
        ...state,
        expandNav: !state.expandNav
      };
    default:
      return state;
  }
}

export const menuActions = {
  toggleMenu,
  toggleNav,
};

function toggleMenu() {
  return { type: 'TOGGLE_MENU' };
}

function toggleNav() {
  return { type: 'TOGGLE_NAV' };
}

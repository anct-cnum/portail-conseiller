export function userRoles() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    return user.user.role ? [user.user.role] : user.user.roles; //Pour cas standard + impression PDF
  } else {
    return null;
  }
}

export function userId() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    return user.user._id;
  } else {
    return null;
  }
}

export function isNavigatorFirefoxForAndroid() {
  if (navigator.userAgent.match(/firefox|fxios/i) && navigator.userAgent.match(/Android/i)) {
    return true;
  }
  return false;
}

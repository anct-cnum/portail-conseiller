export const alerteActions = {
  getMessageAlerte,
  resetMessageAlerte,
};

function getMessageAlerte(alerte) {
  return { type: 'GET_MESSAGE_ALERTE', alerte };
}

function resetMessageAlerte(toggle) {
  return { type: 'RESET_MESSAGE_ALERTE', toggle };
}

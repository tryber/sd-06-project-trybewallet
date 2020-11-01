// Coloque aqui suas actions

export function changeUser(newUser) {
  return {
    type: 'CHANGE_EMAIL',
    payload: newUser,
  };
}
export function changeWallet(newWallet) {
  return {
    type: 'CHANGE_WALLET',
    payload: newWallet,
  };
}

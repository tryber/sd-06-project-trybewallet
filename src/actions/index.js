// Coloque aqui suas actions
export function selectUser(email) {
  return {
    type: 'ADD_USER',
    payload: {
      email,
    },
  };
}

export function selectWallet(currencies, expenses) {
  return {
    type: 'ADD_WALLET',
    payload: {
      currencies,
      expenses,
    },
  };
}

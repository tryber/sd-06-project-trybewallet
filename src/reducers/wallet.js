// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

function wallet(state = {}, action) {
  switch (action.type) {
    case 'WALLET':
      return state;
    default:
      return state; 
  }
}

export default wallet;
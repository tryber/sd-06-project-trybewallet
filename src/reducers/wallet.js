const INITIAL_STATE = { currencies: [], expenses: [] };

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

export default function (state = INITIAL_STATE, action) {
  // retorna um novo estado baseado no type da action
  switch (action.type) {
    case 'WALLET':
      return;
    default:
      return state;
  }
}
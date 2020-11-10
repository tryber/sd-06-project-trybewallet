// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {

  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const { payload } = action;

  switch (action.type) {
  case 'ADD_WALLET':

    return {
      ...state,
      expenses: [...state.expenses, payload.expenses],
      currencies: [...state.currencies, payload.currencies],
    };

  default:
    return state;
  }
}

export default wallet;

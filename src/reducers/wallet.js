// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_EXPENSES':
      return { ...state, expenses: [...state.wallet.expenses, action.payload] };
    case 'FETCH_CURRENCIES_SUCCESS':
      return { ...state, currencies: Object.keys(action.cotacaoMoeda).filter((element) => element != 'USDT') };
    default:
      return state;
  }
}

export default wallet;

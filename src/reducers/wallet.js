// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'NEW_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'FETCH_CURRENCIES_SUCCESS':
    return { ...state, currencies: Object.keys(action.coin).filter((e) => e !== 'USDT') };
    /* case 'DELETE_EXPENSE':
    return { ...state, expenses: [...state, expenses.filter((e) => e !== (expenses.length -1))]}; */
  default:
    return state;
  }
}

export default wallet;

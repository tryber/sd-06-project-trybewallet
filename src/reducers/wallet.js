const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_CURRENCY':
    return { ...state, currencies: { ...action.currenciesAPI } };
  case 'FETCH_CURRENCY_STORE':
    return {
      ...state,
      expenses: [...state.expenses].concat({ ...action.currenciesAPI }) };
  default:
    return state;
  }
}

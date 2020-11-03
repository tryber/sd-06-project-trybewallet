const INITIAL_STATE = {
  currencies: [],
  expenses: [{
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: [],
  }],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_CURRENCY':
    return { ...state, currencies: { ...action.currenciesAPI } };
  case 'FETCH_CURRENCY_STORE':
    return { ...state, expenses: expenses[6]: ...action.currenciesAPI  };
  default:
    return state;
  }
}

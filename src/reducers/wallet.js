import { GET_CURRENCY_VALUES_SUCCESS } from '../actions';

const INITIAL_STATE = { currencyInfo: [], currencies: [] };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY_VALUES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
      currencyInfo: Object.values(action.currencies),
    };
  default:
    return state;
  }
};

export default wallet;

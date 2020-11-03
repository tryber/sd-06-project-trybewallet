import { GET_CURRENCY_VALUES_SUCCESS, LOADING_CURRENCIES } from '../actions';

const INITIAL_STATE = { currencyValues: [], currencies: [], currencyValuesLoading: true };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING_CURRENCIES:
    return { ...state, currencyValuesLoading: true };
  case GET_CURRENCY_VALUES_SUCCESS:
    return {
      ...state,
      currencyValues: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
      currencies: Object.values(action.currencies),
      currencyValuesLoading: false };
  default:
    return state;
  }
};

export default wallet;

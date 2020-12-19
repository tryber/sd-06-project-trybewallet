import fetchAPI from '../services/api';
import { getCurrencies } from './getCurrencies';

function fetchCurrencies() {
  return (dispatch) => {
    fetchAPI()
      .then((currencies) => {
        if (currencies && currencies.USDT) delete currencies.USDT;
        dispatch(getCurrencies(currencies));
      });
  };
}

export default fetchCurrencies;

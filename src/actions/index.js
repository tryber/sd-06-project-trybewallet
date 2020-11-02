import getAllCurrencies from '../services/currenciesAPI';

export const LOGIN = 'LOGIN';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const RECEIVE_CURRENCY_OK = 'RECEIVE_CURRENCY_OK';

export const resquestCurrencyOk = (currencies) => ({
  type: RECEIVE_CURRENCY_OK,
  currencies,
});

export const currenciesThunk = () => (dispatch) => {
  getAllCurrencies()
    .then((currencies) => dispatch(resquestCurrencyOk(currencies)));
};

// export function currenciesThunk() {
//   return (dispatch) => getAllCurrencies()
//     .then(
//       (json) => dispatch(resquestCurrencyOk(json)),
//       (error) => dispatch(requestCurrencyFail(error.message)),
//     );
// }

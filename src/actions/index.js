import fetchApi from '../apiCoin/apiResponse';

export const ADD_USER = 'ADD_USER';
export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export const addUser = (email) => ({ type: 'ADD_USER', email });

export const requestForData = () => ({
  type: REQUEST_API,
});

export const receivedResponse = (currenciesValue) => ({
  type: RECEIVE_RESPONSE,
  currencies: currenciesValue,
});

export function getApiThunk() {
  return async (dispatch) => {
    dispatch(requestForData());

    const getObj = await fetchApi();
    const {
      USD, CAD, EUR, GBP,
      ARS, BTC, LTC, JPY, CHF,
      AUD, CNY, ILS, ETH, XRP,
    } = getObj;
    const allCurrencies = [
      USD, CAD, EUR, GBP,
      ARS, BTC, LTC, JPY, CHF,
      AUD, CNY, ILS, ETH, XRP,
    ];
    dispatch(receivedResponse(allCurrencies));
  };
}
// Coloque aqui suas actions

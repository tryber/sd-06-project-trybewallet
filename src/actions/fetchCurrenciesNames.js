import { SAVE_CURRENCIES_NAMES } from './actionTypes';

function saveCurrenciesNamesToStore(currenciesNames) {
  return {
    type: SAVE_CURRENCIES_NAMES,
    payload: {
      currenciesNames,
    },
  };
}

function fetchCurrenciesNames() {
  return async (dispatch) => {
    const requestResponse = await fetch(
      'https://economia.awesomeapi.com.br/json/all',
    );
    const formattedData = await requestResponse.json();
    const currencies = Object.keys(formattedData);
    const withoutUSDTCurrencies = currencies.filter((currency) => (
      currency !== 'USDT'
    ));

    dispatch(saveCurrenciesNamesToStore(withoutUSDTCurrencies));
  };
}

export default fetchCurrenciesNames;

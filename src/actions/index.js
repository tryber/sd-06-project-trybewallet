// Coloque aqui suas actions
export function selectUser(email) {
  return {
    type: 'ADD_USER',
    payload: {
      email,
    },
  };
}

export function selectWallet(expenses, currencies) {
  return {
    type: 'ADD_WALLET',
    payload: {
      expenses,
      currencies,
    },
  };
}

export function fetchCurrency(form) {
  const { id, value, description, tag, currency, method, currencyName } = form;
  return async (dispatch) => {
    try {
      const currencys = await fetch('https://economia.awesomeapi.com.br/json/all');
      const jsonCurrencys = await currencys.json();
      delete jsonCurrencys.USDT;
      const result = {
        id, value, description, currency, method, tag, exchangeRates: jsonCurrencys };
      dispatch(selectWallet(result, currencyName));
    } catch (error) {
      dispatch('ERROR');
    }
  };
}

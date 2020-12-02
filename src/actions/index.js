// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const CURRENCY = 'CURRENCY';

export const saveEmail = (value) => ({
  type: EMAIL,
  value,
});

export const saveCurrency = (currency) => ({
  type: CURRENCY,
  currency,
});

export const fetchCurrencyThunk = () => async (dispatch) => {
  const fetchCurrency = await fetch('https://economia.awesomeapi.com.br/json/all');
  const fetchCurrencyResponse = await fetchCurrency.json();
  dispatch(saveCurrency(fetchCurrencyResponse));
};

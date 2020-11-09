export const EMAIL = 'ADD_EMAIL';
export const CURRENCY = 'CURRENCY';

export const saveUserEmail = (value) => ({
  type: EMAIL,
  value,
});

export const currencyAction = (currency) => ({
  type: CURRENCY,
  currency,
});

export function fetchCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => dispatch(currencyAction(response)));
  };
}

export const LOGIN = 'LOGIN';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';

// Coloque aqui suas actions
// Funções que retornam objetos

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const currencyAction = (currency) => ({
  type: CURRENCY,
  currency,
});

export const expenses = (expense) => ({
  type: EXPENSES,
  expense,
});

export function fetchCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => dispatch(currencyAction(response)));
  };
}

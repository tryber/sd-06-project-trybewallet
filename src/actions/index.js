export const LOGIN = 'LOGIN';
export const SELECTCURRENCY = 'SELECTCURRENCY';
export const ADDEXPENSE = 'ADDEXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const selectCurrency = (currency) => ({
  type: SELECTCURRENCY,
  currency,
});

export const addExpense = (expense) => ({
  type: ADDEXPENSE,
  expense,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const infoAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const infoJSON = await infoAPI.json();
    dispatch(selectCurrency(infoJSON));
  };
}

import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

export const saveUser = (userEmail) => ({
  type: 'SAVE_USER',
  payload: userEmail,
});

export const saveCurrency = (currencies) => ({
  type: 'SAVE_CURRENCY',
  payload: currencies,
});

export const saveExpense = (expenses) => ({
  type: 'SAVE_EXPENSE',
  expenses,
})

// export function fetchApi() {
//   const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const currencies = await responseFromAPI.json();
//   dispatch(saveCurrency(currencies));
// }

export const thunkCurrencies = () => async (dispatch) => {
  const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseFromAPI.json();
  dispatch(saveCurrency(currencies));
};

export function thunkExpenses(userExpense) {
  return async (dispatch, getState) => {
    const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await responseFromAPI.json();
    const { expenses } = getState().wallet;
    let idExpense = 0;
    if (expenses.length === 0) {
      idExpense = 0;
    } else {
      idExpense = expenses[expenses.length - 1].id + 1;
    }
    const newExpense = { ...userExpense, id: idExpense, exchangeRates: currencies };
    return (dispatch(saveExpense(newExpense)));
  };
}

import apiCurrencies from '../services/dataAPI';

export const LOGIN = 'LOGIN';
export const RESPONSE = 'RESPONSE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';
export const ID_SAVE = 'ID_SAVE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const BTN_EDIT = 'BTN_EDIT';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const responseAPI = (prices) => (
  {
    type: RESPONSE,
    prices,
  });

export const fetchCurrenciesAction = () => (
  async (dispatch) => {
    const aux = await apiCurrencies();
    delete aux.USDT;
    dispatch(responseAPI(aux));
  }
);

export const expenseAction = (exchangeRates, expense) => ({
  type: ADD_EXPENSE,
  expense,
  exchangeRates,
});

export const removeExpense = (id) => ({
  type: DEL_EXPENSE,
  id,
});

export const saveId = (id) => ({
  type: ID_SAVE,
  id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const btnEdit = (expense) => ({
  type: BTN_EDIT,
  editId: expense.id,
});

export const ratesList = (expense) => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const returnAPI = await fetch(endpoint);
  const exchangeRates = await returnAPI.json();
  dispatch(expenseAction(exchangeRates, expense));
};

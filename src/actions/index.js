import currencyAPI from '../services/currencyAPI';

// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ADD_CURRENCY = 'ADD_CURRENCY';

// Login ##########
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

// Expenses ##########
export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const addCurrency = (currencies) => ({
  type: ADD_CURRENCY,
  currencies,
});

// Get data ##########

export const sendCurrencyThunk = () => (dispatch) => {
  currencyAPI()
    .then((currencies) => dispatch(addCurrency(currencies)));
};

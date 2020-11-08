// Coloque aqui suas actions
import currencyApi from '../services/currencyApi';

// salvando usuario pelo email
export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const actionsEmailLogin = (email) => ({
  type: 'EMAIL_LOGIN',
  payload: email,
});

// salvando total da carteira
export const TOTAL_WALLET = 'TOTAL_WALLET';
export const totalField = (payload) => ({
  type: TOTAL_WALLET,
  payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await currencyApi();
    const currencies = Object.keys(response);
    dispatch(totalField(currencies));
  };
}

// salvando password
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const savePassword = (password) => ({
  type: SAVE_PASSWORD,
  password,
});

// Salvando despesas
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveExpense = (expenseData, currencies) => ({
  type: SAVE_EXPENSE,
  payload: { ...expenseData, exchangeRates: currencies },
});

export function registerExpense(expenseData) {
  return async (dispatch) => {
    const exchangeRates = await currencyApi();
    dispatch(saveExpense(expenseData, exchangeRates));
  };
}

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  expenseId,
});
// export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });

// export default actionsEmailLogin;

// export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });
// export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });
// export const login = (value) => ({ type: 'LOGIN', value });

// Coloque aqui suas actions
import currencyApi from '../services/currencyApi';

// Salvando usuario pelo email
export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const actionsEmailLogin = (email) => ({
  type: 'EMAIL_LOGIN',
  payload: email,
});

// Salvando total da carteira
export const TOTAL_WALLET = 'TOTAL_WALLET';
export const totalField = (payload) => ({
  type: TOTAL_WALLET,
  payload,
});

// Buscar moeda API
export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await currencyApi();
    const currencies = Object.keys(response);
    dispatch(totalField(currencies));
  };
}

// Salvando password
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

// Registrando despesas
export function registerExpense(expenseData) {
  return async (dispatch) => {
    const exchangeRates = await currencyApi();
    dispatch(saveExpense(expenseData, exchangeRates));
  };
}

// Deletar despesas
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  expenseId,
});

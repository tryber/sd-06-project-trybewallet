import getAll from '../services/api';

export const LOGIN = 'LOGIN';
export const CURRENCIES = 'CURRENCIES';
export const SV_EXPENSES = 'SV_EXPENSES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const currency = (payload) => ({
  type: CURRENCIES,
  payload,
});

export function apiCurrencies() {
  return async (dispatch) => {
    const respose = await getAll();
    const currencies = Object.keys(respose).filter((item) => item !== 'USDT');
    dispatch(currency(currencies));
  };
}

export const saveExpenses = (expensesForm, currencies) => ({
  type: SV_EXPENSES,
  payload: { ...expensesForm, exchangeRates: currencies },
});

export function apiExpense(expensesForm) {
  return async (dispatch) => {
    const exchangeRates = await getAll();
    dispatch(saveExpenses(expensesForm, exchangeRates));
  };
}

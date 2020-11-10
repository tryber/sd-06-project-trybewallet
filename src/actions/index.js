export const SAVELOGIN = 'SAVE_LOGIN';
export const FUNC_CURRENCIES = 'FUNC_CURRENCIES';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';

export const saveLogin = (email) => ({
  type: SAVELOGIN,
  email,
});

export const apiCurrencies = (api) => ({
  type: FUNC_CURRENCIES,
  api,
});

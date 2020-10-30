export const FILL_CURRENCIES = 'FILL_CURRENCIES';
export const FILL_EXPENSES = 'FILL_EXPENSES';

export const fillCurrencies = (currency) => (
  { type: FILL_CURRENCIES, currency }
);

export const fillExpenses = (expense) => (
  { type: FILL_EXPENSES, expense }
);

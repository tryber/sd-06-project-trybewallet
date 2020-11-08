export const LOGIN = 'LOGIN';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const CURRENCY = 'CURRENCY';

export function user({ email }) {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
}
export function expensesReducer({ totalExpenses }) {
  return {
    type: TOTAL_EXPENSES,
    payload: {
      totalExpenses,
    },
  };
}

export function currencyReducer({ currency }) {
  return {
    type: CURRENCY,
    payload: {
      currency,
    },
  };
}

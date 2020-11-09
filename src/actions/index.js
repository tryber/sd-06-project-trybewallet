const LOGIN = 'LOGIN';
const EXPENSE_HDL = 'EXPENSE_HDL';
const EXPENSE_DEL = 'EXPENSE_DEL';

const signLogin = (email) => ({ type: LOGIN, email });

const expenseHandle = (state) => {
  const {
    id,
    value,
    currency,
    method,
    tag,
    description,
    exchangeRates,
  } = state;

  return ({
    type: EXPENSE_HDL,
    expense: {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    },
  });
};

const expensesDelete = (state) => {
  const {
    id,
    value,
    currency,
    method,
    tag,
    description,
    exchangeRates,
  } = state;
  return ({
    type: EXPENSE_DEL,
    expense: {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    },
  });
};

export { signLogin, expenseHandle, expensesDelete };

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

let idCount = 0;
const tenThousand = 10000;

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ACCOUNTING':
    return {
      ...state,
      total: state.total + action.sum,
    };
  case 'CURRENCY':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'ADD_EXPENSE':
    for (let i = 0; i < tenThousand; i += 1) {
      const temp = state.expenses.find((item) => item.id === i);
      if (temp !== undefined) {
        idCount = i + 1;
      }
    }
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.expense, id: idCount },
      ],
    };
  case 'REMOVE_EXPENSE':
    if (true) {
      const index = state.expenses.findIndex((e) => e.id === action.id);
      const mew = state.expenses;
      const minusOne = -1;
      if (index > minusOne) {
        mew.splice(index, 1);
        return {
          ...state,
          expenses: [
            ...mew,
          ],
        };
      }
    }
    return state;
  case 'EDIT':
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}

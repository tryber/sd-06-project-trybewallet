// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const ADD_EXPENSES = 'ADD_EXPENSES';

const initialState = {

  currencies: [],
  expenses: [],

};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
};

export default wallet;

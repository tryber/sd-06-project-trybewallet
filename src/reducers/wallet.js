const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  default:
    return state;  
  }
}
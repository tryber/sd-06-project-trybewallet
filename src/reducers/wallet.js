// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  helloWorld: 'helldux',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  default:
    return state;
  }
}

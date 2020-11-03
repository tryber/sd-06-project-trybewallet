// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  helloWorld: 'Wallet Page',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  default:
    return state;
  }
}

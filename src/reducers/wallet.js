const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  helloWorld: 'hello',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  default:
    return state;
  }
}

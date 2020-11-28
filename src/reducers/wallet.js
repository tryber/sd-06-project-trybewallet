const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  default:
    return state;
  }
}

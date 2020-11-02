// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

import { LOGIN } from '../actions';

const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: { email: action.email }};
    default:
      return state;
  }
}

export default reducer;

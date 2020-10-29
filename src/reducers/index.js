import { combinereducers } from 'redux';
// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_EMAIL':
      return [...state.user.email, action.value];
    case 'ADD_CURRENCIE':
      return [...state.wallet.currencies, action.value];
    case 'ADD_EXPENSES':
      return [...state.wallet.expenses, action.value];
    default:
      return state;
  }
}

export default walletReducer;

// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const INITIAL_STATE = {
  email: '',
  pass: '',
};

const stateReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SAVE_LOGIN':
      return {
        ...state,
        [action.name]: action.value,
      }

      default:
        return state;
  }
}

export default stateReducer;

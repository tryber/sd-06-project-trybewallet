export { default as user } from './user'
export { default as wallet } from './wallet'

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
};

function getAPI() {
  return { type: 'GET_IMAGE', payload: json.message };
}

function requestAPI() {
  return { type: 'REQUEST_IMAGE' };
}

function failedRequest() {
  return { type: 'FAILED_REQUEST', payload: error };
}

export default function apiMoney() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());

      const moneyResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const getMoney = await moneyResponse.json();

      dispatch(getAPI(getMoney));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

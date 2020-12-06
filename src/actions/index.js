import apiCurrencies from '../services/dataAPI';

export const LOGIN = 'LOGIN';
export const RESPONSE = 'RESPONSE';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const responseAPI = (prices) => (
  {
    type: RESPONSE,
    prices,
  });

// const APIURL = 'https://economia.awesomeapi.com.br/json/all';

// export const fetchCurrenciesAction = () => (async (dispatch) => {
//   const fetchRequest = await fetch(APIURL);
//   const jsonResponse = await fetchRequest.json();
//   delete jsonResponse.USDT;
//   dispatch(responseAPI(jsonResponse));
//   console.log('aqui');
// });

export const fetchCurrenciesAction = () => (
  async (dispatch) => {
    const aux = await apiCurrencies();
    delete aux.USDT;
    dispatch(responseAPI(aux));
    console.log('aqui');
  }
);

export const LOGIN = 'LOGIN';
export const RESPONSE = 'RESPONSE';

export default (email) => ({
  type: LOGIN,
  email,
});

export const responseAPI = (prices) => (
  {
    type: RESPONSE,
    prices,
  });

const APIURL = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrenciesAction = () => async (dispatch) => {
  const fetchRequest = await fetch(APIURL);
  const jsonResponse = await fetchRequest.json();
  delete jsonResponse.USDT;
  dispatch(responseAPI(jsonResponse));
};

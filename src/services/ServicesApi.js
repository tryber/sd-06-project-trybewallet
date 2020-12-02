const thunkGetApi = async () => {
  const responseFromApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseFromApi.json();
  return currencies;
};

// const thunkGetApi = async () => {
//   const responseFromApi = await fetch('https://economia.awesomeapi.com.br/api-de-moedas');
//   const currencies = await responseFromApi.json();
//   return currencies;
export default thunkGetApi;

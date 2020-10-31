const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const Api = () => (
  fetch(APIURL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default Api;

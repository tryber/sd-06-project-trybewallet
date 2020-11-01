const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const Api = () => (
  fetch(APIURL)
    .then((response) => (
      response
        .json()
    ))
);

export default Api;

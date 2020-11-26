const endPoint = 'https://economia.awesomeapi.com.br/json/all';

const getCoin = () => (
  fetch(endPoint)
    .then((response) => response.json())
);

export default getCoin;

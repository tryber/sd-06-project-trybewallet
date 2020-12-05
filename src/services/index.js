export default function fechtCurrencies() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((res) => res.json())
    .then((currencies) => currencies);
}

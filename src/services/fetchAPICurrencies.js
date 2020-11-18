// Função que faz o fetch na API das moedas e retorna um objeto JSON.

export default function fetchAPI() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endpoint)
    .then((resp) => resp.json());
}

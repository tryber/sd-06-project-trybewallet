export const SALVAR_USUARIO = 'SALVAR_USUARIO';
export const SALVAR_CARTEIRA = 'SALVAR_CARTEIRA';

export const salvarUsuario = (usuario) => ({
  type: SALVAR_USUARIO,
  payload: usuario,
});

export const salvarCarteria = (payload) => ({
  type: SALVAR_CARTEIRA,
  payload,
});

const urlApiCurrencies = 'https://economia.awesomeapi.com.br/json/all';
export const apiCurrencies = () => async (dispatch) => {
  const requisicao = await fetch(urlApiCurrencies);
  const respostaJson = await requisicao.json();
  delete requisicao.USDT;
  dispatch(requisicao(respostaJson));
};

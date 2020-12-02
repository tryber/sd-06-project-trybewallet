export const SALVAR_USUARIO = 'SALVAR_USUARIO';
export const SALVAR_CARTEIRA = 'SALVAR_CARTEIRA';
export const PEGAR_CURRENCY = 'PEGAR_CURRENCY';

export const salvarUsuario = (usuario) => ({
  type: SALVAR_USUARIO,
  payload: usuario,
});

export const salvarCarteria = (payload) => ({
  type: SALVAR_CARTEIRA,
  payload,
});

const pegarCurrency = (currencies) => ({
  type: PEGAR_CURRENCY,
  payload: { currencies },
});

export const apiCurrencies = () => async (dispatch) => {
  const requisicao = await fetch('https://economia.awesomeapi.com.br/json/all');
  const respostaJson = await requisicao.json();
  delete requisicao.USDT;
  dispatch(requisicao(respostaJson));
};

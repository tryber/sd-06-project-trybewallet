import apiCurrencies from '../services';

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

export const pegarCurrency = (currencies) => ({
  type: PEGAR_CURRENCY,
  payload: currencies,
});

export const userApi = async () => {
  return async (dispatch) => {
    const aux = await apiCurrencies();
    delete aux.USDT;
    dispatch(pegarCurrency(aux));
  };
};

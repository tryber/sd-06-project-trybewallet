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

// import redux from 'redux';

// redux.dispatch({
//   type: 'ALGO',
//   parametro: 'algo',
// });

export const LOGIN = 'LOGIN';

export const login = (email) => ({
  type: LOGIN,
  email,
});

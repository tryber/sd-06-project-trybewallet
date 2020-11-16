export const LOGIN = 'LOGIN';

export const saveData = (email) => ({
    type: LOGIN,
    email,
});
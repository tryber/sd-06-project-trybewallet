// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
// O que é o reducer? O reducer é uma função que retorna um novo estado baseado no type da action.
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  default:
    return state;
  }
}

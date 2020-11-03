import React from 'react';
import { connect } from 'react-redux';
import { fetchAwesomeAPI } from '../actions';

class ExpenseForm extends React.Component {
  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        {'Valor: '}
        <input data-testid="value-input" type="number" />

        {' Descrição: '}
        <input data-testid="description-input" type="text" />

        {' Método de pagamento: '}
        <select data-testid="method-input">
          <option value="" disabled selected>Escolha uma opção</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        {'Tag: '}
        <select data-testid="tag-input">
          <option value="" disabled selected>Escolha uma opção</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => (
  { fetchAPI: () => dispatch(fetchAwesomeAPI()) }
);

export default connect(
  mapStateToProps, mapDispatchToProps,
)(ExpenseForm);

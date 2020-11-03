import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrency from '../actions';

class ExpenseForm extends Component {
  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input data-testid="value-input" type="number" />
          </label>
          <label htmlFor="coin">
            Moeda:
            <select data-testid="currency-input">
              {currencies.map((currency) => (
                <option
                  key={ currency }
                  data-testid={ currency }
                >
                  { currency }
                </option>))}
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento:
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input data-testid="description-input" type="text" />
          </label>
        </form>
        <button type="button">Adicionar despesa</button>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  getCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()) });

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { currencyThunk } from '../actions';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseValue: '',
      description: '',
      payment: '',
      tagSelected: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const { setCurrency } = this.props;
    setCurrency();
  }

  handleInput({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const {
      expenseValue,
      description,
      payment,
      tagSelected } = this.state;
    const { currenciesApi } = this.props;
    return (
      <div className="expenses-container">
        <form>
          <label htmlFor="expense-value">
            Valor:
            <input
              name="expenseValue"
              id="expense-value"
              value={ expenseValue }
              data-testid="value-input"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="expense-description">
            Descrição
            <input
              name="description"
              id="expense-description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currencySelected"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleInput }
            >
              {currenciesApi.map((currency) => (
                <option
                  key={ currency }
                  value={ currency }
                  data-testid={ currency }
                >
                  { currency }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="payment">
            Pagamento:
            <select
              name="payment"
              id="payment"
              value={ payment }
              data-testid="method-input"
              onChange={ this.handleInput }
            >
              <option value="cash">Dinheiro</option>
              <option value="debit">Cartão de débito</option>
              <option value="credit">Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tagSelected"
              id="tag"
              value={ tagSelected }
              data-testid="tag-input"
              onChange={ this.handleInput }
            >
              <option value="meal">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => console.log('click') }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrency: () => dispatch(currencyThunk()),
});

const mapStateToProps = (state) => ({
  currenciesApi: state.wallet.currencies,
});

Expenses.propTypes = {
  setCurrency: propTypes.func.isRequired,
  currenciesApi: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

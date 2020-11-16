import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinData, saveExpenses, newExpenses, fetchCoinDataThunk, getCurrencyAPI } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
        totalField: 0,
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    currencyFetch();
    getCurrencyAPI();

  }

  handleChange({ target }) {
    const { value } = target;
    const { name } = target;
    const { expense } = this.state;
    this.setState({
      // total: expense.value,
      expense: {
        ...expense,
        [name]: value,
        totalField: value,
      },
    });
  }

  async handleClick(e) {
    e.preventDefault();
    const { expense } = this.state;
    const { newExpencesWallet } = this.props;
    await newExpencesWallet(expense);
    // this.setState({
    //   expense: {
    //     value: '',
    //     description: '',
    //     currency: '',
    //     method: '',
    //     tag: '',
    //   },
    // });
  }

  render() {
    const somaDespesa = 
    const { value, description, currency, method, tag, totalField } = this.state.expense;
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ totalField }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <hr />
        <form>
          <label htmlFor="email">
            Valor
            <input
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option>Escolha</option>
              {currencies.map((moeda) => (
                <option data-testid={ moeda } value={ moeda } key={ moeda }>{moeda}</option>
              ))}
            </select>
          </label>
          <label htmlFor="met_pagamento">
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="initial">Escolha</option>
              <option value="bill">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debt">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="initial">Escolha</option>
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="trasporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.number.isRequired,
  map: PropTypes.func.isRequired,
  currencyFetch: PropTypes.func.isRequired,
  newAction: PropTypes.func.isRequired,
  newExpencesWallet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  // currencyFetch: () => dispatch(fetchCoinDataThunk()),
  
  newExpencesWallet: (expense) => dispatch(newExpenses(expense)),
  currencyFetch: () => dispatch(fetchCoinData()),
  getcurrencies: () => dispatch(getCurrencyAPI());
  // newAction: (expense) => dispatch(saveExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

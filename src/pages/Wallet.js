import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinData, saveExpenses, newExpenses, fetchCoinDataThunk } from '../actions';

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
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    currencyFetch();
  }

  handleChange({ target }) {
    const { value } = target;
    const { name } = target;
    const { expense } = this.state;
    this.setState({

      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  async handleClick() {
    const { newAction } = this.props;
    const { expense } = this.state;
    const { newExpences } = this.props;
    const { newExpencesWallet } = this.props;
    console.log('Aqui', expense);

    // await newAction(expense);
    await newExpencesWallet(expense);
    this.setState({
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
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
  
  newExpencesWallet: () => dispatch(newExpenses()),
  currencyFetch: () => dispatch(fetchCoinData()),
  // newAction: (expense) => dispatch(saveExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

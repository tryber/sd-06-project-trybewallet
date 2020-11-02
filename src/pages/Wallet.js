import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../actions';
import fetchApi from '../services';
import { arrayPaymentMethods, arrayPaymentCategorys } from './arraysWalletOptionsInput';

class Wallet extends React.Component {
  constructor() {
    super();
    this.algo = this.algo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      coins: [],
      value: '',
      description: '',
      currency: '',
      method: arrayPaymentMethods[0],
      tag: arrayPaymentCategorys[0],
    };
  }

  componentDidMount() {
    this.algo();
  }

  async algo() {
    this.setState(async () => {
      const fetchApi1 = await fetchApi();
      const coins = Object.keys(fetchApi1);
      this.setState({
        coins,
        currency: coins[0],
      });
    });
  }

  handleSubmit({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, saveExpense, expenses } = this.props;
    // console.log('o redux completo', reduxCompleto);
    const {
      coins,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <p>
            <span data-testid="total-field">
              {expenses.reduce((total, debt) => {
                const price = parseFloat(debt.exchangeRates[debt.currency].ask);
                return (total + (parseFloat(debt.value) * price));
              }, 0)}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <form>
          <input
            type="number"
            data-testid="value-input"
            placeholder="Valor da value"
            name="value"
            onChange={ this.handleSubmit }
            value={ value }
          />
          <textarea
            data-testid="description-input"
            placeholder="descrição da value"
            name="description"
            onChange={ this.handleSubmit }
            value={ description }
          />
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleSubmit }
            value={ currency }

          >
            {coins.map((moeda) => (
              <option
                key={ moeda }
                data-testid={ moeda }
              >
                { moeda }
              </option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleSubmit }
            value={ method }
          >
            {arrayPaymentMethods.map((method1) => (
              <option key={ method1 }>{ method1 }</option>
            ))}
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleSubmit }
            value={ tag }
          >
            {arrayPaymentCategorys.map((category) => (
              <option key={ category }>{ category }</option>
            ))}
          </select>
          <button
            type="button"
            onClick={ () => saveExpense(this.state) }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (state) => dispatch(addExpense(state)),
});

Wallet.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

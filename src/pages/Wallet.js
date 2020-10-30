import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AddExpense from '../components/AddExpense';
import { storeCurrencies } from '../actions';
import { response as mockResponse } from '../tests/mockData';
import fetchApi from '../services/fetchApi';

import '../css/Wallet.css';
import trybeLogo from '../imgs/trybe-logo.png';

window.fetch = async () => ({ json: () => Promise.resolve(mockResponse) });

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    const { user: email } = this.props;

    this.state = {
      email,
    };

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  async componentDidMount() {
    const { dispatchCurrencies } = this.props;
    const currencies = await fetchApi();
    const currenciesArray = Object.keys(currencies)
      .filter((currency) => currency !== 'USDT');
    dispatchCurrencies(currenciesArray);
  }

  sumExpenses() {
    const { expenses } = this.props;

    return (expenses.length > 0)
      ? (
        Math.round(
          expenses.reduce((acc, curr) => (
            acc + (curr.value * curr.exchangeRates[curr.currency].ask)
          ), 0) * 100,
        ) / 100
      ).toFixed(2)
      : '0.00';
  }

  render() {
    const { email } = this.state;

    return (
      <div>
        <header>
          <section className="header">
            <img src={ trybeLogo } alt="Trybe logo" className="trybe-logo" />
            <section className="header-right">
              <div>
                Câmbio:
                <span data-testid="header-currency-field">
                  {' BRL' }
                </span>
              </div>
              <div>
                Total:
                <span className="total-expenses" data-testid="total-field">
                  { this.sumExpenses() }
                </span>
              </div>
              <h2 data-testid="email-field">{ email }</h2>
            </section>
          </section>
          <section className="header-form">
            <AddExpense />
          </section>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (currencies) => dispatch(storeCurrencies(currencies)),
});

Wallet.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

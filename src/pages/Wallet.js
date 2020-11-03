import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AddExpense from '../components/AddExpense';
import { storeCurrencies } from '../actions';
import { response as mockResponse } from '../tests/mockData';
import fetchApi from '../services/fetchApi';

import '../css/Wallet.css';
import trybeLogo from '../imgs/trybe-logo.png';
import ExpenseTable from '../components/ExpenseTable';

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
    const { expenses, editMode } = this.props;

    return (
      <div>
        <header>
          <section className="header">
            <div className="trybe-logo">
              <img src={ trybeLogo } alt="Trybe logo" />
            </div>
            <section className="header-right">
              <div className="header-inner-wrapper">
                Câmbio:
                <span data-testid="header-currency-field">
                  {' BRL' }
                </span>
              </div>
              <div className="header-inner-wrapper total-expense-wrapper">
                Total:
                <span className="total-expenses" data-testid="total-field">
                  { this.sumExpenses() }
                </span>
              </div>
              <h2 data-testid="email-field" className="email-field">{ email }</h2>
            </section>
          </section>
          <section className="header-form">
            { (editMode)
              ? <div />
              : <AddExpense /> }
          </section>
        </header>
        { (expenses.length > 0)
          ? <ExpenseTable />
          : <p>Você não tem gastos</p> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
  editMode: state.wallet.editMode,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (currencies) => dispatch(storeCurrencies(currencies)),
});

Wallet.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

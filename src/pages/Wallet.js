import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store/index';

import Table from '../components/Table';

import Form from '../components/Form';
import AwesomeAPI from '../services/AwesomeAPI';
import { getExchangeRateToStoreExpenses } from '../actions';

import '../styles/Wallet.css';

// just to check if i got the correct value in state
store.subscribe(() => {
  console.log('state\n', store.getState());
});
class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      expenses: {
        id: 0,
        value: '0',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };

    this.requestAwesomeAPI = this.requestAwesomeAPI.bind(this);
    this.handleSaveExpenses = this.handleSaveExpenses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.calcTotalAmount = this.calcTotalAmount.bind(this);
  }

  async componentDidMount() {
    this.requestAwesomeAPI();
  }

  async requestAwesomeAPI() {
    const { expenses } = this.state;
    const data = await AwesomeAPI();
    delete data.USDT;
    const currencyList = Object.keys(data);
    this.setState({
      currencies: currencyList,
      expenses: { ...expenses },
    });
    return data;
  }

  handleChange(event) {
    const { expenses } = this.state;

    this.setState({
      expenses: { ...expenses, [event.name]: event.value },
    });
  }

  handleSaveExpenses() {
    const { expenses } = this.state;
    const { getExpenses } = this.props;

    getExpenses(expenses);
    this.setState((prevState) => ({
      expenses: {
        ...prevState.expenses,
        id: prevState.expenses.id + 1,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    }));
  }

  calcTotalAmount() {
    const { expenses } = this.props;

    let totalAmount = 0;
    expenses.forEach((expense) => {
      const expenseValue = parseFloat(expense.value);
      const currencyExchange = parseFloat(expense.exchangeRates[expense.currency].ask);
      totalAmount += expenseValue * currencyExchange;
    });
    console.log(totalAmount);
    return totalAmount;
  }

  render() {
    const { email } = this.props;
    const { currencies, expenses } = this.state;
    const expenseTotalAmout = this.calcTotalAmount();
    return (
      <div>
        <header>
          <h1>
            TrybeWallet
          </h1>
          <div>
            <h2 data-testid="email-field">
              {email}
            </h2>
          </div>
          <div>
            <span data-testid="total-field">
              Despesa total:
              {expenseTotalAmout}
            </span>
            <span data-testid="header-currency-field">Câmbio: BRL</span>
          </div>
        </header>
        <section className="form">
          <Form
            currencies={ currencies }
            expenses={ expenses }
            handleSaveExpenses={ this.handleSaveExpenses }
            handleChange={ this.handleChange }
          />
        </section>
        <section>
          <Table />
        </section>
      </div>
    );
  }
}

// get user email from my state - don't forget to dispatch before try to get something in global state
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getExpenses: (expenses) => dispatch(getExchangeRateToStoreExpenses(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    forEach: PropTypes.func.isRequired,
  }).isRequired,
  getExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

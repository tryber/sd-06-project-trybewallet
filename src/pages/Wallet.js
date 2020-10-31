import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import awesomeAPI from '../services/awesomeAPI';
import { storeExpenses } from '../actions';
import Form from '../components/Form';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyList: [],
      expenses: {
        id: 0,
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    };

    this.getCurrencies = this.getCurrencies.bind(this);
    this.saveToState = this.saveToState.bind(this);
    this.saveExpensesToStore = this.saveExpensesToStore.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const data = await awesomeAPI();
    const currencyList = Object.keys(data);
    const { expenses } = this.state;
    this.setState({
      currencyList,
      expenses: { ...expenses, exchangeRates: data } });
  }

  saveToState(target) {
    const { expenses } = this.state;
    this.setState({
      expenses: { ...expenses, [target.name]: target.value },
    });
  }

  saveExpensesToStore(data) {
    const { saveExpenses } = this.props;
    saveExpenses(data);
    this.setState((prevState) => ({
      expenses: {
        ...prevState.expenses,
        id: prevState.expenses.id + 1,
      },
    }));
  }

  render() {
    const { currencyList, expenses } = this.state;
    const { email } = this.props;

    return (
      <div>
        <header>
          <p data-testid="email-field">{`Email:  ${email}`}</p>
          <span data-testid="total-field">{'Despesa Total: 0 '}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <div>
          <Form
            saveToState={ this.saveToState }
            saveExpensesToStore={ this.saveExpensesToStore }
            currencyList={ currencyList }
            expenses={ expenses }
          />
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(storeExpenses(expenses)) });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  saveExpenses: PropTypes.func.isRequired,
};

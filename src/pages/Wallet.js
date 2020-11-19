import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Table from '../components/Table';
import awesomeAPI from '../services/awesomeAPI';
import { editExpense, fetchExchangeRatesAndStoreExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      currencyList: [],
      expenses: {
        id: 0,
        value: '0',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      expensesBeforeEdit: {},
    };

    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveExpensesToStore = this.saveExpensesToStore.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
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
      expenses: { ...expenses } });
  }

  handleChange(target) {
    const { expenses } = this.state;
    this.setState({
      expenses: { ...expenses, [target.name]: target.value },
    });
  }

  saveExpensesToStore() {
    const { expenses, isEditing, expensesBeforeEdit } = this.state;
    const { saveExpenses, editExpenseFromStore } = this.props;
    if (isEditing) {
      editExpenseFromStore(expenses);
      this.setState({ expenses: expensesBeforeEdit, isEditing: false });
    } else {
      saveExpenses(expenses);
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
  }

  handleEditClick(expense) {
    const { expenses } = this.state;
    this.setState({
      isEditing: true,
      expensesBeforeEdit: expenses,
      expenses: {
        id: expense.id,
        value: expense.value,
        description: expense.description,
        currency: expense.currency,
        method: expense.method,
        tag: expense.tag,
      },
    });
  }

  updateTotalValue() {
    const { expenses } = this.props;
    let totalValue = 0;
    expenses.forEach((expense) => {
      const floatValue = parseFloat(expense.value);
      const floatExchangeRate = parseFloat(expense.exchangeRates[expense.currency].ask);
      totalValue += floatValue * floatExchangeRate;
    });
    return totalValue.toFixed(2);
  }

  render() {
    const { currencyList, expenses, isEditing } = this.state;
    const { email } = this.props;
    const totalValue = this.updateTotalValue();

    return (
      <div>
        <header>
          <p data-testid="email-field">{`Email:  ${email}`}</p>
          <span data-testid="total-field">{`Despesa Total: ${totalValue} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <section>
          <Form
            currencyList={ currencyList }
            expenses={ expenses }
            isEditing={ isEditing }
            handleChange={ this.handleChange }
            saveExpensesToStore={ this.saveExpensesToStore }
          />
        </section>
        <section>
          <Table handleEditClick={ this.handleEditClick } />
        </section>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(fetchExchangeRatesAndStoreExpenses(expenses)),
  editExpenseFromStore: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveExpenses: PropTypes.func.isRequired,
  editExpenseFromStore: PropTypes.func.isRequired,
};

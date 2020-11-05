import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, editExpense, fetchCurrencies } from '../actions';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mountForm = this.mountForm.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      addBtn: false,
      editBtn: true,
      editId: 0,
    };
  }

  async componentDidMount() {
    const { fetch } = this.props;
    await fetch();
  }

  handleEdit() {
    this.setState({ addBtn: false, editBtn: true });
    const {
      editId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    const { expenses, editData } = this.props;
    const id = editId;
    const editedExpenses = expenses.map((item) => {
      if (item.id === id) {
        item.value = value;
        item.description = description;
        item.currency = currency;
        item.method = method;
        item.tag = tag;
        item.exchangeRates = exchangeRates;
      }
      return item;
    });
    editData(editedExpenses);
  }

  mountForm(total) {
    const { addData, expenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    const id = expenses.length;
    const output = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    addData(output, total);
  }

  async handleSubmit() {
    const { fetch, rates, total } = this.props;
    const { currency, value } = this.state;
    await fetch();
    let bid = 0;
    // Learned how to iterate through objects here:
    // https://masteringjs.io/tutorials/fundamentals/foreach-object
    Object.keys(rates).forEach((item) => {
      if (currency === item) {
        bid = rates[item].ask;
      }
    });
    this.setState({ exchangeRates: rates });
    const newTotal = total + (value * bid);
    this.mountForm(newTotal);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  editExpense(type, id) {
    if (type === 'edit') this.setState({ addBtn: true, editBtn: false });
    if (type === 'del') this.setState({ addBtn: false, editBtn: true });
    const { expenses } = this.props;
    const expense = expenses
      .filter((item) => id === item.id)
      .reduce((acc, item) => ({
        ...item,
        acc,
      }), {});
    this.setState({
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      exchangeRates: expense.exchangeRates,
      editId: id,
    });
  }

  render() {
    const { email, rates, total } = this.props;
    const { addBtn,
      editBtn,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <header>
          <h3 data-testid="email-field">{email}</h3>
          <p data-testid="total-field" value="0">{total}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Despesa
            <input
              type="number"
              id="value"
              data-testid="value-input"
              name="value"
              // I was getting an uncontrolled type error, learned how to get it right from here:
              // https://stackoverflow.com/questions/47012169/
              // a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro
              value={ value || 0 }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Desc
            <input
              type="text"
              id="description"
              data-testid="description-input"
              name="description"
              value={ description || '' }
              onChange={ this.handleChange }
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency || 'USD' }
            onChange={ this.handleChange }
          >
            {Object.keys(rates)
              .filter((item) => item !== 'USDT')
              .map((item) => (
                <option key={ item } data-testid={ item }>{item}</option>
              ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method || 'Dinheiro' }
            onChange={ this.handleChange }
          >
            {methods.map((item) => <option key={ item }>{item}</option>)}
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag || 'Alimentação' }
            onChange={ this.handleChange }
          >
            {tags.map((item) => <option key={ item }>{item}</option>)}
          </select>
          <button
            type="button"
            disabled={ addBtn }
            onClick={ () => this.handleSubmit() }
          >
            Adicionar despesa
          </button>
          <button
            type="button"
            disabled={ editBtn }
            onClick={ () => this.handleEdit() }
          >
            Editar despesa
          </button>
        </form>
        <WalletTable editExpense={ this.editExpense } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  rates: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchCurrencies()),
  addData: (expense, total) => dispatch(addExpense(expense, total)),
  editData: (updatedData) => dispatch(editExpense(updatedData)),
});

Wallet.propTypes = {
  fetch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  editData: PropTypes.func.isRequired,
  addData: PropTypes.func.isRequired,
  rates: PropTypes.arrayOf(PropTypes.string).isRequired,
  total: PropTypes.number,
  email: PropTypes.string.isRequired,
};

Wallet.defaultProps = {
  total: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

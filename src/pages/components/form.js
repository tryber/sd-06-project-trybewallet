import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Currencies from './currencies';
import { expensesAdd, editExpense } from '../../actions';
import WalletTable from './walletTable';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addExpensesToRedux = this.addExpensesToRedux.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.state = {
      expenses: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
      editId: 0,
      total: 0,
      editBtn: true,
      addBtn: false,
    };
  }

  handleChange({ target, nativeEvent }) {
    const { name, value } = target;
    if (name === 'method' || name === 'tag') {
      const { options, options: { selectedIndex } } = nativeEvent.target;
      this.setState((prev) => ({
        ...prev,
        expenses: {
          ...prev.expenses,
          [name]: options[selectedIndex],
        },
      }));
    }
    this.setState((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [name]: value,
      },
    }));
  }

  handleEdit() {
    this.setState({ editBtn: true, addBtn: false });
    const {
      expenses,
      editId,
      expenses: {
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      },
    } = this.state;
    const { expenses: data, editData } = this.props;
    data.forEach((item) => {
      if (item.id === editId) {
        item.value = value;
        item.description = description;
        item.currency = currency;
        item.method = method;
        item.tag = tag;
        item.exchangeRates = exchangeRates;
      }
    });
    editData(expenses);
  }

  editExpense(type, id) {
    if (type === 'edit') this.setState({ addBtn: true, editBtn: false });
    if (type === 'del') this.setState({ addBtn: false, editBtn: true });
    const { expenses } = this.props;
    const expense = expenses
      .find((item) => id === item.id);
      // .reduce((acc, item) => ({
      //   ...item,
      //   acc,
      // }), {});
    console.log(expense);
    this.setState({
      expenses: {
        value: expense.value,
        description: expense.description,
        currency: expense.currency,
        method: expense.method,
        tag: expense.tag,
        exchangeRates: expense.exchangeRates,
      },
      editId: id,
    });
  }

  handleChangeCurrency(selectCurr) {
    this.setState((prev) => ({ expenses:
      { ...prev.expenses, currency: selectCurr } }));
  }

  async addExpensesToRedux(e) {
    e.preventDefault();
    const { expenses } = this.props;
    const EXPENSES_LENGTH = Object.keys(expenses).length;
    const NEXT_ID = EXPENSES_LENGTH || 0;
    const CURRENCIES = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    this.updateAllState(CURRENCIES, NEXT_ID);
  }

  updateAllState(currencies, id) {
    const { expenses } = this.state;
    const { regExpenses } = this.props;
    const rate = currencies[expenses.currency].ask;
    this.setState((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        id,
        exchangeRates: currencies,
      },
      total: rate * expenses.value,
    }), () => {
      regExpenses(this.state);
    });
  }

  render() {
    const { expenses, nameBtn } = this.props;
    const { value, description, total } = expenses;
    const { addBtn, editBtn } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <div>
          <label htmlFor="value">
            Valor:
            { total }
            <input
              data-testid="value-input"
              id="value"
              name="value"
              type="number"
              className="value"
              placeholder="$"
              value={ value }
              min="0"
              step="0.01"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ (event) => this.handleChange(event) }
          />
          <Currencies handleChangeCurrency={ this.handleChangeCurrency } />
          <label htmlFor="method">
            <select
              data-testid="method-input"
              id="method"
              name="method"
              className="method"
              onChange={ (event) => this.handleChange(event) }
            >
              {methods.map((method) => (
                <option
                  value={ method }
                  key={ method }
                >
                  { method }
                </option>))}
              {/* <option value="dinheiro">Dinheiro</option>
              <option value="card">Cartão de crédito</option>
              <option value="cardDeb">Cartão de débito</option> */}
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              className="tag"
              onChange={ (event) => this.handleChange(event) }
            >
              {categories.map((category) => (
                <option
                  value={ category }
                  key={ category }
                >
                  { category }
                </option>))}
              {/* <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option> */}
            </select>
          </label>
          <button
            disabled={ addBtn }
            onClick={ (e) => this.addExpensesToRedux(e) }
            type="button"
          >
            { nameBtn }
          </button>
          <button
            type="button"
            disabled={ editBtn }
            onClick={ () => this.handleEdit() }
          >
            Editar despesa
          </button>
        </div>
        <WalletTable editExpense={ this.editExpense } />
      </div>
    );
  }
}

const mapStateToProps = (states) => ({
  expenses: states.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  regExpenses: (expense) => dispatch(expensesAdd(expense)),
  editData: (updatedData) => dispatch(editExpense(updatedData)),

});
Form.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.number,
    value: PropTypes.number,
    currency: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.func,
    total: PropTypes.number,
  })).isRequired,
  regExpenses: PropTypes.func.isRequired,
  nameBtn: PropTypes.string.isRequired,
  editData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

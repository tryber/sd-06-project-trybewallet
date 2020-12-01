import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpenses, editExpense, fetchCurrencies } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  componentDidUpdate(props) {
    const { editingExpense } = this.props;
    if (editingExpense !== '' && editingExpense !== props.editingExpense) {
      this.handleEdit();
    }
  }

  handleEdit() {
    const { editingExpense, expenses } = this.props;
    const edit = expenses.find((expense) => expense.id === editingExpense);
    this.setState({
      ...edit,
    });
  }

  handleInput({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { handleExpense, editingExpense, sendExpenseEdited } = this.props;
    const { value, description, method, tag, currency } = this.state;
    if (editingExpense !== '') {
      sendExpenseEdited(this.state);
    } else {
      handleExpense({ value, description, method, tag, currency });
      this.setState({
        value: 0,
        description: '',
        method: 'Dinheiro',
        currency: 'USD',
        tag: 'Alimentação',
      });
    }
  }

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { editingExpense, currencies } = this.props;
    const optionItems = currencies
      .map((cur) => (
        <option
          data-testid={ cur }
          key={ cur }
          value={ cur }
        >
          {cur }
        </option>
      ));

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            name="value"
            type="number"
            value={ value }
            placeholder="Individual expense"
            data-testid="value-input"
            onChange={ ({ target }) => this.handleInput(target) }
          />
          <input
            name="description"
            type="text"
            placeholder="Describe your expense"
            data-testid="description-input"
            value={ description }
            onChange={ ({ target }) => this.handleInput(target) }
          />
          <div>
            <select
              name="currency"
              onChange={ ({ target }) => this.handleInput(target) }
              value={ currency }
              data-testid="currency-input"
            >
              {optionItems}
            </select>
          </div>
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ ({ target }) => this.handleInput(target) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ ({ target }) => this.handleInput(target) }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>

          {editingExpense !== ''
            ? <button type="submit">Editar despesa</button>
            : <button type="submit"> Adicionar despesa</button>}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    editingExpense: state.wallet.editing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleExpense: ({
      value,
      description,
      method,
      tag,
      currency }) => (dispatch(updateExpenses({
      value,
      description,
      method,
      tag,
      currency }))),
    sendExpenseEdited: (expense) => dispatch(editExpense(expense)),
    dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  };
}

Form.propTypes = {
  dispatchFetchCurrencies: PropTypes.func.isRequired,
  editingExpense: PropTypes.func.isRequired,
  expenses: PropTypes.string.isRequired,
  handleExpense: PropTypes.func.isRequired,
  sendExpenseEdited: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

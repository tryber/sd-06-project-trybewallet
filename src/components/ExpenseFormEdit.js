import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEditedExpense } from '../actions';

class ExpenseFormEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: 0,
      currency: '',
      method: '',
      description: '',
      tag: '',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { idToEdit, expenses } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);

    this.fillInputs(expenseToEdit);
  }

  fillInputs(expense) {
    this.setState({ ...expense });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveEdition } = this.props;

    console.log(this.state);

    saveEdition(false, this.state);
  }

  render() {
    const { handleChange, props, state } = this;
    const { currencies } = props;
    const { value, currency, method, description, tag } = state;

    const currenciesDropdownList = [(
      <option
        key={ 0 }
        value=""
        disabled
      >
        --
      </option>
    )];

    currenciesDropdownList.push(currencies.map((currencyFetched, index) => (
      <option
        key={ index + 1 }
        data-testid={ currencyFetched }
        value={ currencyFetched }
      >
        { currencyFetched }
      </option>
    )));

    return (
      <form onSubmit={ this.handleSubmit } className="expense-form-edit">
        <label htmlFor="valueInput">
          {'Valor: '}
          <input
            id="valueInput"
            data-testid="value-input"
            type="number"
            min={ 0 }
            name="value"
            value={ value }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="currencyInput">
          {'Moeda: '}
          <select
            id="currencyInput"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ handleChange }
          >
            {currenciesDropdownList}
          </select>
        </label>
        <label htmlFor="methodInput">
          {' Método de pagamento: '}
          <select
            qid="methodInput"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ handleChange }
          >
            <option value="" disabled>--</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          {'Tag: '}
          <select
            id="tagInput"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ handleChange }
          >
            <option value="" disabled>--</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="descriptionInput">
          {' Descrição: '}
          <input
            id="descriptionInput"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ handleChange }
          />
        </label>

        <button
          type="submit"
          disabled={
            !value || !currency || !method || !tag || !description ? 'disabled' : false
          }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  idToEdit: state.wallet.idExpenseToEdit,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveEdition: (isEdit, editedExpense) => (
    dispatch(saveEditedExpense(isEdit, editedExpense))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFormEdit);

ExpenseFormEdit.propTypes = {
  idToEdit: PropTypes.string.isRequired,
  currencies: PropTypes.arrayof(PropTypes.string).isRequired,
  expenses: PropTypes.arrayof(PropTypes.object).isRequired,
  saveEdition: PropTypes.func.isRequired,
};

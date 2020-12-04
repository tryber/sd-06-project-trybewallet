import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyThunk, fetchExpenseThunk } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleExpenseButtonClick = this.handleExpenseButtonClick.bind(this);

    this.state = {
      expenses: {
        id: 0,
        value: 0,
        description: '',
        cur: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
  }

  componentDidMount() {
    const { currencysFetch } = this.props;
    currencysFetch();
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses, [name]: value },
    }));
  }

  handleExpenseButtonClick(event) {
    event.preventDefault();
    const { expenses } = this.state;
    const { addNewExpense } = this.props;
    addNewExpense(expenses);
    this.setState((prevState) => ({
      ...prevState,
      expenses: {
        ...prevState.expenses,
        id: prevState.expenses.id + 1,
        value: 0,
        description: '',
        cur: 'BRL',
        method: '',
        tag: '',
      },
    }));
  }

  render() {
    const { currency } = this.props;
    const { expenses } = this.state;
    const { value, description, cur, method, tag } = expenses;
    const maxLengthCur = 3;
    return (
      <form>
        <label htmlFor="dispense">
          Dispresa
          <input
            name="value"
            value={ value }
            data-testid="value-input"
            type="number"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            name="description"
            value={ description }
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="cur">
          Cambio
          <select
            data-testid="currency-input"
            name="cur"
            value={ cur }
            onChange={ this.handleChange }
          >
            {currency
              .filter((aCurrency) => aCurrency.length === maxLengthCur)
              .map((onlycur) => (
                <option key={ onlycur } data-testid={ onlycur }>
                  { onlycur }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria para Dispesa
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleExpenseButtonClick }>
          Adicionar Dispesa
        </button>
        Total: 0
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currency,
});

const mapDispatchToProps = (dispatch) => ({
  currencysFetch: () => dispatch(fetchCurrencyThunk()),
  addNewExpense: (expenses) => dispatch(fetchExpenseThunk(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencysFetch: PropTypes.fuc,
  addNewExpense: PropTypes.func,
  currencys: PropTypes.object,
  expenses: PropTypes.object,
}.isRequired;

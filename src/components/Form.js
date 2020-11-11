import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Currencies from './Currencies';
import { addExpense } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.updateAllStates = this.updateAllStates.bind(this);

    this.state = {
      expenses: {
        value: '',
        currency: '',
        method: '',
        tag: 'Alimentação',
        description: '',
      },
      total: 0,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState((prev) => ({ ...prev, expenses: { ...prev.expenses, [name]: value } }));
  }

  handleCurrencyChange(selectedCurrency) {
    this.setState((prev) => ({ expenses:
      { ...prev.expenses, currency: selectedCurrency } }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { expenses } = this.props;
    const EXPENSES_LENGTH = Object.keys(expenses).length;
    const NEXT_ID = EXPENSES_LENGTH || 0;
    const CURRENCIES = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    this.updateAllStates(CURRENCIES, NEXT_ID);
  }

  updateAllStates(currencies, id) {
    const { expenses } = this.state;
    const { registerExpense } = this.props
    const RATE = currencies[expenses.currency].ask;

    this.setState(() => ({
      expenses: {
        ...expenses,
        id,
        exchangeRates: currencies,
      },
      total: RATE * expenses.value,
    }), () => {
      registerExpense(this.state);
    });
  }

  render() {
    const { expenses } = this.props;
    const { value, description, total } = expenses;
    return (
      <div>
        <div>
          TOTAL:
          { total }
        </div>
        <form>
          <label htmlFor="expense">
            Value:
            <input
              data-testid="value-input"
              id="expense"
              name="value"
              onChange={ (e) => this.handleChange(e) }
              value={ value }
              defaultValue="0"
            />
          </label>
          <br />
          <label htmlFor="description">
            Description:
            <input
              data-testid="description-input"
              id="description"
              name="description"
              onChange={ (e) => this.handleChange(e) }
              value={ description }
            />
          </label>
          <br />
          <Currencies handleCurrencyChange={ this.handleCurrencyChange } />
          <br />
          <label htmlFor="method-input">
            Payment method:
            <select
              data-testid="method-input"
              id="method-input"
              name="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option
                value="Cartão de crédito"
              >
                Cartão de crédito
              </option>
              <option
                value="Cartão de débito"
              >
                Cartão de débito
              </option>
            </select>
          </label>
          <br />
          <label htmlFor="tag-input">
            Tag:
            <select
              data-testid="tag-input"
              id="tag-input"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">
                Alimentação
              </option>
              <option value="Trabalho">
                Trabalho
              </option>
              <option value="Lazer">
                Lazer
              </option>
              <option value="Transporte">
                Transporte
              </option>
              <option value="Saúde">
                Saúde
              </option>
            </select>
          </label>
          <br />
          <button
            onClick={ (e) => this.handleSubmit(e) }
            type="submit"
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  registerExpense: (expense) => dispatch(addExpense(expense)),
});

Form.propTypes = {
  expenses: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    exchangeRates: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  registerExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

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
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState((prev) => ({ ...prev, expenses: { ...prev.expenses, [name]: value } }));
  }

  handleCurrencyChange(selectedCurrency) {
    this.setState((prev) => ({ expenses:
      { ...prev.expenses, currency: selectedCurrency } }));
  }

  async handleSubmit() {
    const { expenses } = this.props;
    const EXPENSES_LENGTH = Object.keys(expenses).length;
    const NEXT_ID = EXPENSES_LENGTH || 0;
    const CURRENCIES = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    updateAllStates(CURRENCIES, NEXT_ID);
  }

  updateAllStates(currencies, id) {
    const { expenses } = this.state;
    const { registerExpense } = this.props;

    this.setState(() => ({
      expenses: {
        ...expenses,
        id,
        exchangeRates: currencies,
      },
    }), () => {
      registerExpense(this.state);
    });
  }

  /* fetchCurrency(currency) {
    const CURRENCY = Object.keys(await (await fetch(`https://economia.awesomeapi.com.br/json/${currency}`)).json());
    // this.setState(() => )
  } */
  render() {
    const { expenses } = this.props;
    const { value, description } = expenses;
    return (
      <div>
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
          <label htmlFor="method-input" data-testid="method-input">
            Payment method:
            <select
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
          <label htmlFor="tag-input" data-testid="tag-input">
            Tag:
            <select
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
            onClick={ () => this.handleSubmit() }
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
  }).isRequired,
  registerExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

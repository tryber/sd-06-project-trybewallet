import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../components/Table';
import { fetchCurrenciesAPI, fetchAddExpenses } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      localExpenses: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target: { name, value } }) {
    const { localExpenses } = this.state;
    this.setState({
      localExpenses: { ...localExpenses,
        [name]: value,
      },
    });
  }

  render() {
    const { email, expenses, currencies, callbackExpenses } = this.props;

    const { localExpenses } = this.state;
    const { value, description, method, currency, tag } = localExpenses;

    const total = expenses.length
      ? Math.round(expenses.reduce((ac, val) => ac + val.value
      * val.exchangeRates[val.currency].ask, 0) * 100) / 100
      : 0;

    const methodArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagArray = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <header>
          <span data-testid="email-field">
            {`E-mail: ${email} `}
          </span>
          <span data-testid="total-field">
            {`Despesa Total: ${total} `}
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <main>
          <form>
            <fieldset>
              <div className="form_input">
                <input
                  data-testid="value-input"
                  type="number"
                  name="value"
                  placeholder="Valor BRL"
                  value={ value }
                  onChange={ this.handleChange }
                />
                <input
                  data-testid="description-input"
                  type="text"
                  name="description"
                  placeholder="Descrição"
                  value={ description }
                  onChange={ this.handleChange }
                />
                <select
                  data-testid="currency-input"
                  name="currency"
                  value={ currency }
                  onChange={ this.handleChange }
                >
                  <option disabled value="">
                    Câmbio
                  </option>
                  {currencies.map((option, index) => (
                    <option key={ index } data-testid={ option }>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  data-testid="method-input"
                  name="method"
                  value={ method }
                  onChange={ this.handleChange }
                >
                  <option disabled value="">
                    Forma de Pagamento
                  </option>
                  {methodArray.map((option, index) => (
                    <option value={ option } key={ index }>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  data-testid="tag-input"
                  name="tag"
                  value={ tag }
                  onChange={ this.handleChange }
                >
                  <option disabled value="">
                    Motivo
                  </option>
                  {tagArray.map((option, index) => (
                    <option value={ option } key={ index }>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={ () => callbackExpenses(localExpenses) }
                >
                  Adicionar despesa
                </button>
              </div>
            </fieldset>
          </form>
          <Table />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAPI()),
  callbackExpenses: (value) => dispatch(fetchAddExpenses(value)),
});

Wallet.propTypes = {
  callbackExpenses: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAPI, fetchAddExpenses, removeItem } from '../actions';

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
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleRemoval(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
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
    const fieldArray = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];

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
          <table id="tbl" border="1">
            <thead>
              <tr>
                {fieldArray.map((header, index) => <td key={ index }>{ header }</td>)}
              </tr>
            </thead>
            <tbody>
              {expenses.map((element) => {
                const exchangeValue = Number(element.exchangeRates[element.currency].ask);
                const currencyName = element.exchangeRates[element.currency].name;
                const convertedValue = exchangeValue * element.value;
                return (
                  <tr key={ element.id }>
                    <td>{ element.description }</td>
                    <td>{ element.tag }</td>
                    <td>{ element.method }</td>
                    <td>{ element.value }</td>
                    <td>{ currencyName }</td>
                    <td>{ exchangeValue.toFixed(2)}</td>
                    <td>{ convertedValue.toFixed(2)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        type="button"
                        disabled
                      >
                        Editar
                      </button>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => this.handleRemoval(element.id) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
  deleteExpense: (id) => dispatch(removeItem(id)),
});

Wallet.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  callbackExpenses: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingSaveExpense, fetchingCurrencies } from '../actions/index';
import '../styles/expenses.css';

class Expenses extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      expenses: {
        id: '',
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    };
  }

  componentDidMount() {
    const { fetchCurrenciesSuccess } = this.props;
    fetchCurrenciesSuccess();
    console.log(fetchCurrenciesSuccess, '"currencie"');
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      ...this.state,
      expenses: {
        ...this.state.expenses,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { sendExpenseApi } = this.props;
    const { expenses } = this.state;
    sendExpenseApi(expenses); // thunk
  }

  render() {
    const { value, description, currency, method, tag } = this.state.expenses;
    const { currencies, expenses } = this.props;
    const { handleInput, handleSubmit } = this;
    return (
      <div>
        <form className="despesas">
          <div className="container">
            <div className="input">
              <label htmlFor="expense-value">
                Valor da despesa:
                <input
                  name="value"
                  data-testid="value-input"
                  value={ value }
                  onChange={ handleInput }
                />
              </label>
            </div>
            <div className="input">
              <label htmlFor="description">
                Descrição:
                <input
                  name="description"
                  data-testid="description-input"
                  value={ description }
                  onChange={ handleInput }
                />
              </label>
            </div>

            <div className="input">
              <label htmlFor="currency">
                Moeda:
                <select
                  name="currency"
                  data-testid="currency-input"
                  value={ currency }
                  onChange={ handleInput }
                >
                  {currencies.map((currency) => (
                    <option data-testid="USD" key={ currency }>
                      { currency }
                    </option>
                  ))}

                  {/* {buscar as moedas} */}
                </select>
              </label>
            </div>

            <div className="input">
              <label htmlFor="method">
                Forma de Pagamento:
                <select
                  name="method"
                  data-testid="method-input"
                  value={ method }
                  onChange={ handleInput }
                >
                  <option value="dinehiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>
            </div>
            <div className="input">
              <label htmlFor="tag">
                Tipo:
                <select
                  name="tag"
                  data-testid="tag-input"
                  value={ tag }
                  onChange={ handleInput }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                </select>
              </label>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={ handleSubmit }
              data-testid="value-input"
            >
              Adicionar Despesa
            </button>
          </div>
        </form>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de Pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">editar / excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (

              <tr key={ expense }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.currency}</td>
                <td>{expense.currency}</td>
                <td>{expense.value}</td>
                <td>{expense.value}</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => ('editar') }
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => ('deletar') }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Expenses.propTypes = {
  expenses: PropTypes.objectOf.isRequired,
  currencies: PropTypes.number.isRequired,
  map: PropTypes.func.isRequired,
  fetchCurrenciesSuccess: PropTypes.func.isRequired,
  sendExpenseApi: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesSuccess: () => dispatch(fetchingCurrencies()),
  sendExpenseApi: (expenses) => dispatch(fetchingSaveExpense(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

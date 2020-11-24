import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingSaveExpense, fetchingCurrencies } from '../actions/index';
import '../styles/expenses.css';
import thunkGetApi from '../services/ServicesApi';

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
    sendExpenseApi(this.state); // thunk
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
                  data-testid="value-input"
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
                    <option data-testid="currency" key={ currency }>
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

        <tbody>
          <table className="table">
            <thead className="thead-dark">
              {expenses.map((expense) => (
                <tr key={ expense }>
                  <td>{expense.value}</td>
                  <td>{expense.description}</td>
                  <td>{expense.currency}</td>
                  <td>{expense.method}</td>
                  <td>{expense.tag}</td>
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
            </thead>
          </table>
        </tbody>
      </div>
    );
  }
}

Expenses.propTypes = {
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

/* #### Formulário de adição de Despesa
  * Um botão com o texto \'Adicionar despesa\' que salva as informações da despesa no estado global e atualiza a soma de despesas no header.
    * Desenvolva a funcionalidade do botão "Adicionar despesa" de modo que ao clicar no botão, as seguintes ações sejam executadas:
    * Os valores dos campos devem ser salvos no estado da aplicação, na chave ***expenses***, dentro de um array contendo todos gastos que serão adicionados:

      * O `id` da despesa **deve** ser um número sequencial, começando em 0. Ou seja: a primeira despesa terá id 0, a segunda terá id 1, a terceira id 2, e assim por diante.

      * Você deverá salvar a cotação do câmbio feita no momento da adição para ter esse dado quando for efetuar uma edição do gasto. Caso você não tenha essa informação salva, o valor da cotação trazida poderá ser diferente do obtido anteriormente.

    Atenção nesse ponto: você deverá fazer uma requisição para API e buscar a cotação no momento que o botão de `Adicionar despesa` for apertado. Para isso você deve utilizar um thunk

    * Após adicionar a despesa, atualize a soma total das despesas. Essa informação deve ficar no header dentro do elemento com `data-testid="total-field"` */

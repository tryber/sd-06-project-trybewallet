import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData, newExpense, deleteData } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
  }

  componentDidMount() {
    const { fetchCurrencyData } = this.props;
    fetchCurrencyData();
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  addExpense() {
    const { saveFields } = this.props;
    const { expense } = this.state;
    const { value, currency } = expense;
    if (
      value !== ''
      && currency !== ''
    ) {
      saveFields(expense);
      this.setState({
        expense: {
          value: '',
          description: '',
          currency: '',
          method: '',
          tag: '',
        },
      });
    }
  }

  render() {
    const { email, expenses, currencies, deleteData } = this.props;
    const { expense } = this.state;
    const { value, currency, method, tag, description } = expense;
    const tabela = ['Descrição',
      'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    const expensesSum = 0;

    return (
      <div>
        <nav className="user-info">
          <div>
            User:
            <span data-testid="email-field">
              { email }
            </span>
          </div>
          <div>
            Despesas: R$
            <span data-testid="total-field">
              { expensesSum }
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </nav>
        <div className="form">
          Valor:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            { currencies.map((coin) => (
              <option data-testid={ coin } key={ coin }>{ coin }</option>
            )) }
          </select>
          Pagamento:
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ this.addExpense }
          >
            Adicionar despesa
          </button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                { tabela.map((campo) => (
                  <th key={ campo } scope="col">{ campo }</th>
                )) }
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={ exp.id }>
                  <td>{ exp.description }</td>
                  <td>{ exp.tag }</td>
                  <td>{ exp.method }</td>
                  <td>{ exp.value }</td>
                  <td>{ exp.exchangeRates[exp.currency].name}</td>
                  <td>
                    { (parseFloat(exp.exchangeRates[exp.currency].ask)).toFixed(2) }
                  </td>
                  <td>
                    { (exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteData(exp.id) }
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveFields: (expense) => dispatch(newExpense(expense)),
  fetchCurrencyData: () => dispatch(fetchData()),
  deleteData: (expense) => dispatch(deleteData(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  fetchCurrencyData: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  saveFields: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

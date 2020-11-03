import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions/addExpense';
import fetchCurrencies from '../actions/fetchCurrencies';
import '../style/ExpenseForm.css';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      id: '',
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  // Um botão com o texto 'Adicionar despesa' que salva as informações da despesa no estado global e atualiza a soma de despesas no header.
  // - Desenvolva a funcionalidade do botão "Adicionar despesa" de modo que ao clicar no botão, as seguintes ações sejam executadas:
  // Os valores dos campos devem ser salvos no estado da aplicação, na chave expenses, dentro de um array contendo todos gastos que serão adicionados:
  // O id da despesa deve ser um número sequencial, começando em 0. Ou seja: a primeira despesa terá id 0, a segunda terá id 1, a terceira id 2, e assim por diante.
  // => Você deverá salvar a cotação do câmbio feita no momento da adição para ter esse dado quando for efetuar uma edição do gasto. Caso você não tenha essa informação salva, o valor da cotação trazida poderá ser diferente do obtido anteriormente.
  // Atenção nesse ponto: você deverá fazer uma requisição para API e buscar a cotação no momento que o botão de `Adicionar despesa` for apertado. Para isso você deve utilizar um thunk
  // => Após adicionar a despesa, atualize a soma total das despesas. Essa informação deve ficar no header dentro do elemento com data-testid="total-field"

  handleSubmit(event) {
    event.preventDefault();
    const { saveExpense, currencies, expenses } = this.props;
    const id = expenses.length > 0 ? (expenses[expenses.length - 1].id + 1) : 0;

    saveExpense({
      ...this.state,
      id,
      exchangeRates: currencies,
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form className="form_wallet">
          <label htmlFor="value">
            Valor:
            <input
              className="value-input"
              data-testid="value-input"
              id="value"
              type="number"
              name="value"
              required
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              className="currency-input"
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              {currencies.map((coin, index) => (
                <option
                  key={ index }
                  value={ coin }
                  data-testid={ coin }
                >
                  { coin }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              className="method-input"
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              className="tag-input"
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              className="description-input"
              data-testid="description-input"
              id="description"
              type="text"
              name="description"
              required
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="button_wallet"
            type="submit"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  saveExpense: (expense) => dispatch(addExpense(expense)),
});

ExpenseForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf().isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

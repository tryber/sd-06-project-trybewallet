import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiMoney, { expenses as valores } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { myMoney, currencies } = this.props;
    myMoney(currencies);
  }

  onSubmit(event) {
    event.preventDefault();
    const { myExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    myExpenses({ value, description, currency, method, tag });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    /* totalValue feito com a ajuda do colega William pelo SLACK */
    const totalValue = expenses.length ? Math.round(expenses
      .reduce((acc, cur) => acc + cur.value * cur.exchangeRates[cur.currency]
        .ask, 0) * 100) / 100 : 0;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            Email:
            { email }
          </p>
          <p data-testid="total-field">
            Despesas totais:
            { totalValue }
          </p>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              data-testid="currency-input"
              id="moeda"
              name="currency"
              onChange={ this.handleChange }
            >
              { currencies.map((m) => (
                <option key={ m } value={ m } data-testid={ m }>{ m }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.handleChange }
            >
              <option value="" key="selecione" selected>Selecione</option>
              { pagamento.map((p) => (
                <option key={ p } value={ p }>{ p }</option>
              ))}
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="" key="selecione" selected>Selecione</option>
              { tag.map((t) => (
                <option key={ t } value={ t }>{ t }</option>
              ))}
            </select>
          </label>
          <button type="submit" onClick={ this.onSubmit }>Adicionar despesa</button>
        </form>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
          </tr>
          {/*           <tr>
            {expenses.map()}
          </tr> */}
        </table>
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
  myMoney: (cotacaoMoeda) => dispatch(apiMoney(cotacaoMoeda)),
  myExpenses: (payload) => dispatch(valores(payload)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  myMoney: PropTypes.func.isRequired,
  myExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrency, addNewExpenseThunk } from '../actions/index';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.selectCurrency = this.selectCurrency.bind(this);
    this.handleSelectPay = this.handleSelectPay.bind(this);
    this.handleSelectTag = this.handleSelectTag.bind(this);
    this.handleSelectCurrency = this.handleSelectCurrency.bind(this);
  }

  componentDidMount() {
    const { currenciesAPI } = this.props;
    currenciesAPI();
  }

  /* tive dificuldade para implementar a lógica de fazer o id aumentar,
  então me baseei na mesma lógica usada pela Dani Perse
  link do PR: https://github.com/tryber/sd-06-project-trybewallet/pull/45/files */

  sendInfos() {
    const { addNewExpense, expensesStore } = this.props;
    const numExpenses = expensesStore.length;
    const newExpense = {
      id: numExpenses,
      ...this.state,
    };
    addNewExpense(newExpense);
    this.setState({ value: 0 });
  }

  handleSelectCurrency(event) {
    const { target: { value } } = event;
    this.setState({
      currency: value,
    });
  }

  selectCurrency() {
    const { currenciesStore } = this.props;
    const nomesMoedas = Object.keys(currenciesStore);
    const currenciesSelect = nomesMoedas.filter((moeda) => moeda !== 'USDT');
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          onChange={ this.handleSelectCurrency }
          data-testid="currency-input"
          value={ currency }
          name="currency-input"
          id="currency-input"
        >
          { currenciesSelect.map((moeda, index) => (
            <option value={ moeda } data-testid={ moeda } key={ index }>
              { moeda }
            </option>)) }
        </select>
      </label>
    );
  }

  handleSelectPay(event) {
    const { target: { value } } = event;
    this.setState({
      method: value,
    });
  }

  selectPay() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Modo de Pagamento:
        <select
          onChange={ this.handleSelectPay }
          data-testid="method-input"
          value={ method }
          id="method-input"
          name="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  handleSelectTag(event) {
    const { target: { value } } = event;
    this.setState({
      tag: value,
    });
  }

  selectTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          onChange={ this.handleSelectTag }
          data-testid="tag-input"
          value={ tag }
          id="tag-input"
          name="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  // implementação final do requisito 4.6:
  // utilizei a lógica do William Gomes para conseguir finalizar a soma dos produtos
  // mas graças a ajuda do Luiz Simões para compeender todas as partes do reducer
  // link do PR: https://github.com/tryber/sd-06-project-trybewallet/pull/8/files

  render() {
    const { emailStore, expensesStore } = this.props;
    const { value, description } = this.state;
    const totalValue = expensesStore.length ? Math.round(expensesStore
      .reduce((acc, current) => acc + current.value
       * current.exchangeRates[current.currency].ask, 0) * 100) / 100 : 0;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            Email:
            { emailStore }
          </span>
          <span style={ { marginLeft: '20px' } } data-testid="total-field">
            Despesa Total: R$
            { totalValue }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              value={ value }
              data-testid="value-input"
              type="number"
              onChange={ (event) => this.setState({ value: event.target.value }) }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              value={ description }
              data-testid="description-input"
              type="text"
              onChange={ (event) => this.setState({ description: event.target.value }) }
            />
          </label>
          {this.selectCurrency()}
          {this.selectPay()}
          {this.selectTag()}
          <button type="button" onClick={ () => this.sendInfos() }>
            Adicionar despesa
          </button>
        </form>
        <br />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailStore: state.user.email,
  currenciesStore: state.wallet.currencies,
  expensesStore: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesAPI: () => dispatch(requestCurrency()),
  addNewExpense: (state) => dispatch(addNewExpenseThunk(state)),
});

Wallet.propTypes = {
  emailStore: PropTypes.string.isRequired,
  currenciesStore: PropTypes.arrayOf(Object).isRequired,
  currenciesAPI: PropTypes.func.isRequired,
  addNewExpense: PropTypes.func.isRequired,
  expensesStore: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

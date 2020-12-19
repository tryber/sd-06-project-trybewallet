import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRates, sendExpenseToGlobalState, sendTotalValue } from '../actions';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.setExpenses = this.setExpenses.bind(this);
  }

  async componentDidMount() {
    // requisição para montar o campo drop down
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        this.setState({
          exchangeRates: data,
        });
      });
    // console.log(Object.keys(this.state.exchangeRates))
    // console.log(this.state.moedas)
  }

  setExpenses() {
    const { expenses, currencies, sendATotalValue } = this.props;
    let totalValue = 0;
    expenses.map((expense) => {
      // pegar o valor da cotação de cada expense
      const currencyName = expense.currency;
      const currencyValue = currencies[currencyName].ask;

      // multiplicando o valor de cada expense pela cotação correspondente
      // e somando no totalValue
      const valueInBRL = Number((expense.value * currencyValue).toFixed(2));
      totalValue += valueInBRL;
      return totalValue;
    });
    // jogar o valor somado no state global, para ser usado no header
    // CHAMA UMA ACTION
    // console.log(totalValue.toFixed(2))
    sendATotalValue(totalValue);
  }

  async handleClick() {
    const { getAllRates, sendTheExpenseToGlobalState } = this.props;

    await getAllRates();

    // enviando o objeto da despesa (state) pro expenses do global state
    sendTheExpenseToGlobalState(this.state);

    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));

    this.setExpenses();

    // resetando tudo pro original
    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { totalValue, isFetching } = this.props;
    const { value, exchangeRates, currency, method, tag, description } = this.state;
    return (
      <div className="formComponent">
        {totalValue }
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            value={ value }
            id="valor"
            data-testid="value-input"
            onChange={ (e) => {
              this.setState({
                value: e.target.value,
              });
              // this.state.value = e.target.value;
            } }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            id="moeda"
            data-testid="currency-input"
            value={ currency }
            onChange={ (e) => {
              this.setState({
                currency: e.target.value,
              });
              // this.state.currency = e.target.value;
            } }
          >
            {/* moedas: Object.keys(data), */ }
            { Object.keys(exchangeRates).map((moeda, index) => (
              <option key={ index } data-testid={ moeda } value={ moeda }>
                { moeda }
              </option>)) }
          </select>
        </label>
        <label htmlFor="metodo">
          Método de pagamento:
          <select
            id="metodo"
            data-testid="method-input"
            value={ method }
            onChange={ (e) => {
              this.setState({
                method: e.target.value,
              });
              // this.state.method = e.target.value;
            } }
          >
            <option key={ 0 } value="dinheiro">
              Dinheiro
            </option>
            <option key={ 1 } value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option key={ 2 } value="Cartão de débito">
              Cartão de débito
            </option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ (e) => {
              this.setState({
                tag: e.target.value,
              });
              // this.state.tag = e.target.value;
            } }
          >
            <option key="a" value="Alimentação">
              Alimentação
            </option>
            <option key="b" value="Lazer">
              Lazer
            </option>
            <option key="c" value="Trabalho">
              Trabalho
            </option>
            <option key="d" value="Transporte">
              Transporte
            </option>
            <option key="e" value="Saúde">
              Saúde
            </option>
          </select>
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            type="text"
            id="descricao"
            value={ description }
            data-testid="description-input"
            onChange={ (e) => {
              this.setState({
                description: e.target.value,
              });
              // this.state.description = e.target.value;
            } }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
        {isFetching ? <p>Loading...</p>
          : <p>Completely loaded!</p> }
      </div>
    );
  }
}

// const localState = {
//   id: 0,
//   value: '',
//   description: '',
//   currency: 'USD',
//   method: '',
//   tag: '',
//   exchangeRates: '',
// }

// function Form({ sendExpenseToGlobalState, isFetching, getRates, ratesJson, expenses, currencies }) {
//   let moedas = ['USD', 'USDT', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
//     'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];

//   // pegar o estado local e disparar uma action pra alterar o estado global
//   function handleClick() {

//   }

// todas as moedas no exchangeRates???
// localState.exChangeRates = ratesJson;
// localState.exchangeRates = ratesJson[localState.currency];

// console.log(localState.exchangeRates)
// console.log(ratesJson)

// console.log(expenses)
// console.log(isFetching)

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  ratesJson: state,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllRates: () => dispatch(getRates()),
  sendTheExpenseToGlobalState: (object) => dispatch(sendExpenseToGlobalState(object)),
  sendATotalValue: (totalValue) => dispatch(sendTotalValue(totalValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendATotalValue: PropTypes.func.isRequired,
  getAllRates: PropTypes.func.isRequired,
  sendTheExpenseToGlobalState: PropTypes.func.isRequired,
  totalValue: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

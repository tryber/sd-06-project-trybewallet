import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from '../services/api';
import { walletThunk } from '../actions';
import Table from '../components/Table';

class Wallet extends Component {
  constructor() {
    super();
    this.handleApi = this.handleApi.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.storeExp = this.storeExp.bind(this);
    this.totalExp = this.totalExp.bind(this);
    this.state = {
      currencies: [],
      expenses: {
        id: 0,
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
  }

  componentDidMount() {
    this.handleApi();
  }

  totalExp() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach((expense) => {
      const valueFloat = parseFloat(expense.value);
      const float = parseFloat(expense.exchangeRates[expense.currency].ask);
      sum += valueFloat * float;
    });
    return sum.toFixed(2);
  }

  async handleApi() {
    const result = await get();
    const cKeys = Object.keys(result);
    const curr = cKeys.filter((item) => item !== 'USDT');
    this.setState({ currencies: curr });
  }

  handleInputChange(target) {
    const { expenses } = this.state;
    this.setState({
      expenses: { ...expenses, [target.name]: target.value },
    });
  }

  storeExp() {
    const { saveExpenses } = this.props;
    const { expenses } = this.state;
    saveExpenses(expenses);
    this.setState((prevState) => ({
      expenses: { ...prevState.expenses, id: prevState.expenses.id + 1, value: 0 },
    }));
  }

  render() {
    const sum = this.totalExp();
    const { currencies, expenses: { value, description } } = this.state;
    const cSelect = currencies.map((currencie) => (
      <option key={ currencie } data-testid={ currencie } value={ currencie }>
        {currencie}
      </option>
    ));

    const { email } = this.props;
    return (
      <div>
        <header className="header">
          <h1>Trybe</h1>
          <div>
            <span>Email:</span>
            <span data-testid="email-field">{ email }</span>
          </div>
          <div>
            <span>Despesa Total: R$</span>
            <span data-testid="total-field">
              {sum}
            </span>
            <span data-testid="header-currency-field"> BRL </span>
          </div>
        </header>
        <div className="form">
          <form>
            <label htmlFor="value">
              <span>Valor: </span>
              <input
                data-testid="value-input"
                type="number"
                name="value"
                id="value"
                value={ value }
                onChange={ (e) => this.handleInputChange(e.target) }
              />
            </label>
            <label htmlFor="currency">
              <span> Moeda: </span>
              <select
                data-testid="currency-input"
                name="currency"
                id="currency"
                defaultValue="default"
                onChange={ (e) => this.handleInputChange(e.target) }
              >
                <option disabled value="default"> Selecione </option>
                {cSelect}
              </select>
            </label>
            <label htmlFor="method-input">
              <span>Método de Pagamento: </span>
              <select
                data-testid="method-input"
                name="method"
                id="method-input"
                defaultValue="default"
                onChange={ (e) => this.handleInputChange(e.target) }
              >
                <option disabled value="default"> Selecione </option>
                <option value="Dinheiro"> Dinheiro </option>
                <option value="Cartão de crédito"> Cartão de crédito </option>
                <option value="Cartão de débito"> Cartão de débito </option>
              </select>
            </label>
            <label htmlFor="tag">
              <span>Tag: </span>
              <select
                data-testid="tag-input"
                name="tag"
                id="tag"
                defaultValue="default"
                onChange={ (e) => this.handleInputChange(e.target) }
              >
                <option disabled value="default"> Selecione </option>
                <option value="Alimentação"> Alimentação </option>
                <option value="Lazer"> Lazer </option>
                <option value="Trabalho"> Trabalho </option>
                <option value="Transporte"> Transporte </option>
                <option value="Saúde"> Saúde </option>
              </select>
            </label>
            <label htmlFor="description">
              <span>Descrição: </span>
              <input
                data-testid="description-input"
                type="text"
                name="description"
                id="description"
                value={ description }
                onChange={ (e) => this.handleInputChange(e.target) }
              />
            </label>
            <button
              type="button"
              onClick={ () => this.storeExp() }
            >
              Adicionar despesa
            </button>
          </form>
        </div>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(walletThunk(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  saveExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

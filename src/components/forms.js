import React from 'react';
import { connect } from 'react-redux';
// import propTypes from 'prop-types';
// import { selectCurrency, addExpenses} from '../actions';

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  render() {
    const { expenses, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="InputValue">
            Valor da Despesa:
            <input
              data-testid="value-input"
              value={ expenses }
              type="number"
              min="0"
              onChange={ (event) => this.setState({ expenses: event.target.value }) }
            />
          </label>
          <br />
          <label htmlFor="InputDescription">
            Descrição da Despesa:
            <input
              data-testid="description-input"
              type="text"
              value={ description }
              onChange={ (event) => this.setState({ description: event.target.value }) }
            />
          </label>
          <br />
          <label htmlFor="InputCurrencyDescription">
            Moeda de Despesa:
            <select
              data-testid="currency-input"
              value={ currency }
              onChange={ (event) => this.setState({ currency: event.target.value }) }
            >
              USD
            </select>
          </label>
          <label htmlFor="InputPayment">
            Método de Pagamento:
            <select
              data-testid="method-input"
              value={ method }
              onChange={ (event) => this.method({ method: event.target.value }) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="Tag">
            TAG:
            <select
              data-testid="tag-input"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  walletProps: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Forms);

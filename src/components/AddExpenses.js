import React from 'react';
import './AddExpenses.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { connect } from 'react-redux';
import { fetchCurrenciesPrice } from '../actions';

class AddExpenses extends React.Component {
  componentDidMount() {
    const { fetchPrices } = this.props;
    fetchPrices();
  }

  render() {
    const currencies = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const { currenciesPrice } = this.props;
    console.log(currenciesPrice);
    return (
      <form className="add-expense">
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            className="inputs size1"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currencie">
          Moeda:
          <select
            id="currencie"
            type="text"
            className="inputs size1"
            data-testid="currency-input"
          >
            {currencies.map((currencie) => (
              <option
                key={ currencie }
                value={ currencie }
                data-testid={ currencie }
              >
                {currencie}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select id="payment" type="text" className="inputs size3">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" type="text" className="inputs size2">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            className="inputs size4"
            data-testid="description-input"
          />
        </label>
        <button type="button">
          <AiOutlinePlusCircle className="bt-icon-plus" size="35" />
          <span>
            Adicionar
            <br />
            Despesa
          </span>
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesPrice: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrices: () => dispatch(fetchCurrenciesPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses);

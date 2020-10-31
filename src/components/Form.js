import React from 'react';
import { connect } from 'react-redux';
import { thunkCurrency } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: [],
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { currency } = this.state;
    const { fetchCurrencies } = this.props;
    return (
      <form>
        <label
          htmlFor="valorDespesa"
        >
          Valor da Despesa
          <input
            data-testid="value-input"
            type="text"
            id="valorDespesa"
          />
        </label>
        <label
          htmlFor="descricaoDespesa"
        >
          Descrição da despesa
          <input
            data-testid="description-input"
            type="text"
            id="descricaoDespesa"
          />
        </label>
        <label
          htmlFor="moedaCorrente"
        >
          <select
            data-testid="currency-input"
            name="moedaCorrente"
            id="moedaCorrente"
          >
            <option
              data-testid=""
              value={ fetchCurrencies(currency) }
            >
              { (e) => e.target.value }
            </option>
          </select>
        </label>
        <label
          htmlFor="metodoPgto"
        >
          <select
            data-testid="method-input"
            name="metodoPgto"
            id="metodoPgto"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label
          htmlFor="categoriaDespesa"
        >
          <select
            data-testid="tag-input"
            name="categoriaDespesa"
            id="categoriaDespesa"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.curriencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(thunkCurrency()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

import React from 'react';
import { connect } from 'react-redux';
import { thunkCurrency } from '../actions';
import './form.css';

class Form extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    const { listOfcurrencies } = this.props;
    return (
      <form className="form-container">
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
          htmlFor="currencies"
        >
          <select
            data-testid="currency-input"
            name="currencies"
            id="currencies"
          >
            { listOfcurrencies.currencies.map((curr) => (
              <option
                key={ curr }
                data-testid={ curr }
              >
                { curr }
              </option>
            ))}
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
        <br />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  listOfcurrencies: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(thunkCurrency()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

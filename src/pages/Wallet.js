import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <span>E-mail</span>
          <span data-testid="email-field">{ email }</span>
          <span>Despesa Total</span>
          <span data-testid="total-field">0</span>
          <span>Câmbio utilizado</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          <label
            htmlFor="valorDespesa"
          >
            Valor da Despesa
            <input
              data-testid="value-input"
              type="number"
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
              <option data-testid="USD" value="USD">USD</option>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Wallet);

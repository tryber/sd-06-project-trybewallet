import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="valor-despesa">
            Valor:
            <input
              type="number"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="descricao-despesa">
            Descrição:
            <input
              type="number"
              data-testid="description-input"
            />
          </label>
          <select data-testid="currency-input">
            <option value="Escolha">Currency</option>
            <option value="usd">USD</option>
            <option value="cad">CAD</option>
            <option value="eur">EUR</option>
          </select>
          <select data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="saude">Saúde</option>
          </select>
          <button
            type="button"
            data-testid="delete-btn"
            // onClick={}
          >
            Delete
          </button>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: propTypes.arrayOf(propTypes.array).isRequired,
};

export default connect(mapStateToProps, null)(Wallet);

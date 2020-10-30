import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <span>
            {email}
          </span>
        </header>
        <form>
          <label htmlFor="expense-value">
            Valor da Despesa
            <input name="expense-value" type="text" data-testid="value-input" />
          </label>
          <label htmlFor="expense-description">
            <input name="expense-description" type="text" data-testid="description-input" />
          </label>
          <select data-testid="currency-input">
            <option data-testid="USD">USD</option>
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    email: state.user.email,
  }
);

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

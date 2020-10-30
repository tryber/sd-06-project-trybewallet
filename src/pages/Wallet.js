import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { emailUser } = this.props;
    return (
      <div>
        <header>
          Email:
          <span> </span>
          <span data-testid="email-field">{ emailUser.email }</span>
          <span> </span>
          Despesa total: R$
          <span> </span>
          <span data-testid="total-field">0</span>
          <span> </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          <label htmlFor="expenseValue">
            Valor:
            <input data-testid="value-input" id="expenseValue" type="text" />
          </label>
          <label htmlFor="description">
            Descrição:
            <input data-testid="description-input" id="description" type="text" />
          </label>
          {/* <label htmlFor="currency">
            Moeda:
            <select data-testid="currency-input" id="currency">
            </select>
          </label> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user,
});

Wallet.propTypes = {
  emailUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);

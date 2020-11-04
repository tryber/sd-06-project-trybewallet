import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../index.css';
import trybeLogo from '../img/trybe-logo.png';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <div>
        <header>
          <img src={ trybeLogo } alt="Trybe logo" />
          <div>
            <span data-testid="email-field">
              E-mail:
              { email }
            </span>
            <span data-testid="total-field">
              Despesa Total: R$
              { !totalExpenses ? 0 : totalExpenses }
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <Form />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  state,
  email: state.user.email,
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  totalExpenses: PropTypes.number.isRequired,
};

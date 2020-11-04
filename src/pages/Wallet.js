import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../index.css';
import trybeLogo from '../img/trybe-logo.png';
import Form from '../components/Form';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalValue: 0,
    }

    // this.postValue = this.postValue.bind(this);
  }

  render() {
    return (
      <div>
        <header>
          <img src={ trybeLogo } alt="Trybe logo" />
          <div>
            <span data-testid="email-field">
              E-mail:
            { this.props.email }
            </span>
            <span data-testid="total-field">Despesa Total: R$ { this.props.totalExpenses ? this.props.totalExpenses : 0 }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <Form />
      </div>
    )
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

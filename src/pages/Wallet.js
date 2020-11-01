import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormExpense from '../components/FormExpense';
import '../css/Wallet.css';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header className="headerInfo">
          <ul>
            <li data-testid="email-field">{`Email: ${userEmail}`}</li>
            <li data-testid="total-field">{`Despesas Totais: ${0}`}</li>
            <li data-testid="header-currency-field">BRL</li>
          </ul>
        </header>
        <FormExpense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);

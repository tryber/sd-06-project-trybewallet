import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { user: { email } } = this.props;
    return (
      <header>
        <h1 data-testid="email-field">
          { email }
        </h1>
        <h1>
          Despesa total:
          <span data-testid="total-field">
            0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </h1>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({ 
  user,
});

Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  //wallet: PropTypes.shape({
    //currencies: PropTypes.arrayOf(PropTypes.shape({
      //code: PropTypes.string.isRequired,
      //name: PropTypes.string.isRequired,
      //ask: PropTypes.number.isRequired,
    //})).isRequired,
  //}).isRequired,
};

export default connect(mapStateToProps)(Wallet);

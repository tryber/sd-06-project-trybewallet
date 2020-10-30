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

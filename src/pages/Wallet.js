import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <section className="wallet-page">
        <span data-testid="email-field">{ userEmail }</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.PropType = {
  userEmail: propTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends Component {
  render() {
    const { userEmail } = this.props;

    return (
      <section>
        <header>
          <div className="user-data">
            <span data-testid="email-field">
              User: { userEmail }
            </span>
            <span data-testid="total-field">Total Spends: 0</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
      </section>
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

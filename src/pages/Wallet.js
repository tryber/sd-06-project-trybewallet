import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <input
          data-testid="total-field"
          type="number"
          value="0"
        />
        <input
          data-testid="header-currency-field"
          type="text"
          value="BRL"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);

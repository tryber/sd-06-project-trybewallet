import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h4 data-testid="email-field">{`Email: ${email}`}</h4>
          <h5 data-testid="total-field">Despesa total: 0</h5>
          <h5 data-testid="header-currency-field">Câmbio: BRL</h5>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: propTypes.string.isRequired,
};

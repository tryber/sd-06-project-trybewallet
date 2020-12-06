import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store/index';

// get user email from my state - don't forget to dispatch before try to get something in global state
const mapStateToProps = (state) => ({
  email: state.user.email,
});

// just to check if i got the correct value in state
store.subscribe(() => {
  console.log('state\n', store.getState());
});
class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>
          TrybeWallet
        </h1>
        <div>
          <h4 data-testid="email-field">
            {email}
          </h4>
        </div>
        <div>
          <span data-testid="total-field">
            Despesa total: 0
          </span>
          <span data-testid="header-currency-field">
            Câmbio: BRL
          </span>
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Wallet);

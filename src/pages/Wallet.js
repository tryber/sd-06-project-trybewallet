import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalExpenses: 0,
    };
  }

  render() {
    const { userEmail } = this.props;
    const { totalExpenses } = this.state;
    return (
      <div>
        <h2>TrybeWallet</h2>
        <p data-testid="email-field">{`Email: ${userEmail}`}</p>
        <p data-testid="total-field">{`Despeza Total: ${totalExpenses}`}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);

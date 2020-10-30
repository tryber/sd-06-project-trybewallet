import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <span>E-mail</span>
        <span data-testid="email-field">{ user.email }</span>
        <span>Despesa Total</span>
        <span data-testid="total-field">0</span>
        <span>Câmbio utilizado</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (StateDaStore) => ({
  user: StateDaStore,
});

Wallet.propTypes = {
  user: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(Wallet);

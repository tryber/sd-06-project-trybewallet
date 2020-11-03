import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { emailStore } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            Email:
            { emailStore }
          </span>
          <span style={ { marginLeft: '20px' } } data-testid="total-field">
            Despesa Total: R$ 0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailStore: state.user.email,
});

Wallet.propTypes = { emailStore: PropTypes.string.isRequired };

export default connect(mapStateToProps)(Wallet);

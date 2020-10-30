import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currency: 'BRL',
      expenses: 0,
    };
  }

  render() {
    const { currency, expenses } = this.state;
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          {`E-mail: ${email} `}
        </span>
        <span data-testid="total-field">
          {`Despesa Total: ${expenses} `}
        </span>
        <span data-testid="header-currency-field">
          {currency}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);

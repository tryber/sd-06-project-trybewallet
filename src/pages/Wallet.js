import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="value-input">
            0
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <Link to="/">Voltar</Link>
        <br />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.user.email,
});

Wallet.propTypes = { email: PropTypes.string.isRequired };

export default connect(mapStateToProps)(Wallet);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* IMG */
// import navLogo from '../img/trybe-logo.png';

/* COMPONENTES */
// import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        {/* <img src="" alt="trybe-logo" /> */}
        <span>
          <p data-testid="email-field">{email}</p>
        </span>

        <span>
          <p data-testid="total-field">
            Total de despesas:
            <p data-testid="header-currency-field" />
          </p>
        </span>
      </header>
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

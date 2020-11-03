import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* IMG */
// import navLogo from '../img/trybe-logo.png';

/* COMPONENTES */
// import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        {/* <img src="" alt="trybe-logo" /> */}
        <p data-testid="email-field">{email}</p>

        <span> Despesa total: </span>
        <p data-testid="total-field" value="0">{total}</p>
        <p data-testid="header-currency-field"> BRL </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Wallet);

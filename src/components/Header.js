import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { ImgWallet } from '../img/trybeWallet.png';

export class Header extends Component {
  render() {
    const { email, sumRedux, cambio } = this.props;
    return (
      <div>
        <img src={ ImgWallet } alt="ImgWallet" />
        <div>
          <p data-testid="email-field">{`Usuario: ${email}`}</p>
          <p data-testid="total-field" value="0">{`Total: ${sumRedux}`}</p>
          <p data-testid="header-currency-field">{`Câmbio: ${cambio}`}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  sumRedux: state.wallet.sum,
  cambio: state.wallet.cambio,
});

Header.propTypes = {
  state: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, null)(Header);

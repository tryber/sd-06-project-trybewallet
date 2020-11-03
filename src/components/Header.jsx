import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import trybeWallet from '../pages/trybeWallet.png';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { email } = this.props;
    return (
      <nav className="header-nav">
        <Link className="header-link" to="/">
          <img src={ trybeWallet } alt="Logo" width="100px" />
        </Link>
        <section data-testid="email-field">{ email }</section>
        <section data-testid="total-field">
          {`${'Despesa Total: R$ '}
              ${'0,00'}`}
        </section>
        <section data-testid="header-currency-field">{`${'BRL'}`}</section>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);

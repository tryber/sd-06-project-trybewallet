import React from 'react'
import { connect } from 'react-redux';
import '../styles/Header.css'

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return(
      <div className="main-content">
        <div className="trybe-header">
          <h2>TRYBE WALLET</h2>
        </div>
        <div className="info-header">
          <h4 data-testid="email-field">{email}</h4>
          <h4>Despesa total: R$
            <span data-testid="total-field"> 0 </span>
            <span data-testid="header-currency-field">BRL</span>
          </h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email
});

export default connect(
    mapStateToProps,
  )(Header);

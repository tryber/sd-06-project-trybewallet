import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
      expenses: 0,
    };
  }

  render() {
    const { emailLogin } = this.props;
    const { currency, expenses } = this.state;
    return (
      <header>
        <div>
          Login:
          <div data-testid="email-field">{ emailLogin }</div>
        </div>
        <div data-testid="total-field">
          Despesas totais:
          { expenses }
        </div>
        <div data-testid="header-currency-field">
          Moeda:
          { currency }
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailLogin: state.user.email,
});

Header.propTypes = {
  emailLogin: PropTypes.string,
};

Header.defaultProps = {
  emailLogin: 'email',
};

export default connect(mapStateToProps, null)(Header);

import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    console.log(email);
    return (
      <div>
        <header>
          <span
            data-testid="email-field"
            id="email-user"
          >
            {`Email ${email}  | ` }
          </span>

          <span
            data-testid="total-field"
            id="total-gastos"
          >
            {'0 | '}
          </span>

          <span
            data-testid="header-currency-field"
            id="moeda"
          >
            BRL |
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

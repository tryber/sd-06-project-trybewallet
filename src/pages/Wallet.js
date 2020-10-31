import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{ email }</div>
          <div data-testid="total-field">
            Gastos totais:
            { 0 }
          </div>
          <div data-testid="header-currency-field">Cambio: BRL</div>
        </header>
        <Form />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.addEmailRecord.user.email,
  };
}

export default connect(mapStateToProps)(Wallet);

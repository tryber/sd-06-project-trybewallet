import React from 'react';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sumTotal: 0,
    };
    this.handleShowTotal = this.handleShowTotal.bind(this);
  }

  handleShowTotal() {
    const { expenses } = this.props;
    const { sumTotal } = this.state;
    const { currency, value, exchangeRates } = expenses[expenses.length - 1];
    const compra = exchangeRates[currency].ask;
    const sum = value * compra;
    this.setState({ sumTotal: sumTotal + sum });
    console.log(sumTotal + sum);
  }

  render() {
    const { email, expenses } = this.props;
    const { sumTotal } = this.state;
    if (expenses) {
      return (
        <div>
          <p data-testid="email-field">
            Bem vindo:
            {email}
          </p>
          <p data-testid="total-field" value="0">0</p>
          <p data-testid="header-currency-field" value="BRL" />
        </div>
      );
    }
    return <div>OI</div>
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);

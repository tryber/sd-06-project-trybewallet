import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);

    this.state = {
      // allExpenses: [],
    };
  }

  componentDidMount() {
    const { expenses } = this.props;
    this.handleState(expenses);
  }

  // componentDidUpdate(_previouState, newState) {
  //   const { expenses } = this.props;
  //   const { objExpenses } = this.state;
  //   if (newState !== objExpenses) {
  //     this.handleState(expenses);
  //   }
  // }

  handleState(state) {
    // this.setState({ allExpenses: state });
  }

  render() {
    const { userEmail, expenses } = this.props;
    // const { allExpenses } = this.state;
    console.log(expenses);
    return (
      <nav className="header-nav">
        <Link className="header-link" to="/"><h3>WALLET</h3></Link>
        <section className="header-email-expenses">
          <section data-testid="email-field">{ userEmail }</section>
          <section className="header-expenses">
            <section data-testid="total-field">
              {`${'Despesa Total: R$ '}
              ${'0,00'}`}
            </section>
            <section data-testid="header-currency-field">{`${'BRL'}`}</section>
          </section>
        </section>
      </nav>
    );
  }
}

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);

// const { expenses } = this.props;
// const onlyValues = expenses.map((each) => Number(each.value));
// console.log(onlyValues);
// onlyValues.reduce((acc, cur) => {
//   cur = newState;
//   return acc + cur;
// }, 0);
// this.setState({ values: onlyValues });

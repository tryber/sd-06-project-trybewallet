import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrency, actionExpenseThunk } from '../actions';
import { Fieldset, Header, Table } from '../components';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: [],
    };
  }

  componentDidMount() {
    const { allCoins, actionFetch } = this.props;
    actionFetch(allCoins);
  }

  handleClick() {
    const { actionThunk, expenses } = this.props;
    const newId = expenses.length;
    actionThunk({ ...this.state, id: newId });
  }

  render() {
    const { allCoins } = this.props;
    const { value } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const allTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <main className="wallet-container">
        <header className="wallet-header">
          <Header />
        </header>
        <fieldset className="wallet-fieldset">
          <Fieldset
            changeValue={ (e) => this.setState({ value: e.target.value }) }
            changeCoin={ (e) => this.setState({ currency: e.target.value }) }
            changeMethod={ (e) => this.setState({ method: e.target.value }) }
            changeTag={ (e) => this.setState({ tag: e.target.value }) }
            changeDescription={ (e) => this.setState({ description: e.target.value }) }
            coins={
              allCoins.map((coin) => (
                <option data-testid={ coin } key={ coin }>
                  {coin}
                </option>
              ))
            }
            methods={
              methods.map((met) => <option value={ met } key={ met }>{met}</option>)
            }
            allTags={
              allTags.map((tag) => <option value={ tag } key={ tag }>{tag}</option>)
            }
            value={ value }
          />
          <button
            className="btn-wallet"
            onClick={ () => this.handleClick() }
            type="button"
          >
            Adicionar despesa
          </button>
        </fieldset>
        <section className="wallet-table">
          <Table />
        </section>
      </main>
    );
  }
}

Wallet.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape()).isRequired,
  allCoins: propTypes.oneOfType([propTypes.shape(), propTypes.array]).isRequired,
  actionFetch: propTypes.func.isRequired,
  actionThunk: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allCoins: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  actionFetch: () => dispatch(fetchCurrency()),
  actionThunk: (expense) => dispatch(actionExpenseThunk(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

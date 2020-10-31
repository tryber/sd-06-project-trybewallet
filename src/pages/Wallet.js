import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrency, actionExpenses } from '../actions';
import Header from '../components/Header';
import Fieldset from '../components/Fieldset';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: [],
      coin: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: [],
    };
  }

  componentDidMount() {
    const { allCoins, actionFetch } = this.props;
    actionFetch(allCoins);
  }

  render() {
    const { allCoins, actionSave } = this.props;
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
            changeCoin={ (e) => this.setState({ coin: e.target.value }) }
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
            methods={ methods.map((method) => <option key={ method }>{method}</option>) }
            allTags={ allTags.map((tag) => <option key={ tag }>{tag}</option>) }
          />
          <button
            className="btn-wallet"
            onClick={ () => actionSave(this.state) }
            type="button"
          >
            Adicionar despesa
          </button>
        </fieldset>
      </main>
    );
  }
}

Wallet.propTypes = {
  allCoins: propTypes.oneOfType([propTypes.shape(), propTypes.array]).isRequired,
  actionFetch: propTypes.func.isRequired,
  actionSave: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allCoins: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  actionFetch: () => dispatch(fetchCurrency()),
  actionSave: (expenses) => dispatch(actionExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

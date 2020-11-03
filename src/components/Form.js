import React from 'react';
import { connect } from 'react-redux';
import { getRates, sendExpenseToGlobalState } from '../actions'

const localState = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: '',
  tag: '',
  exchangeRates: '',
}

function Form({ sendExpenseToGlobalState, isFetching, getRates, ratesJson, expenses }) {
  let moedas = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
    'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];

  // pegar o estado local e disparar uma action pra alterar o estado global
  function handleClick() {
    getRates()
    sendExpenseToGlobalState(localState);
    console.log(expenses);
    // console.log(localState)
  }
  
  localState.exchangeRates = ratesJson[localState.currency]; // VOLTAR!!!
  console.log(localState.exchangeRates)
  // console.log(ratesJson)

  // console.log(expenses)
  // console.log(isFetching)

  return (
    <div className="formComponent" >
      <label htmlFor="valor">
        Valor:
      <input
          type="number"
          id="valor"
          data-testid="value-input"
          onChange={ (e) => {
            localState.value = e.target.value;
          } }
        />
      </label>
      <label htmlFor="moeda">
        Moeda:
      <select
          id="moeda"
          data-testid="currency-input"
          onChange={ (e) => {
            localState.currency = e.target.value;
          } }
        >
          { moedas.map((moeda, index) => (
            <option key={ index } data-testid={ moeda } value={ moeda }>
              { moeda }
            </option>)) }
        </select>
      </label>
      <label htmlFor="metodo">
        Método de pagamento:
      <select
          id="metodo"
          data-testid="method-input"
          onChange={ (e) => {
            localState.method = e.target.value;
          } }
        >
          <option key={ 0 } value="dinheiro">
            Dinheiro
          </option>
          <option key={ 1 } value="Cartão de crédito">
            Cartão de crédito
          </option>
          <option key={ 2 } value="Cartão de débito">
            Cartão de débito
          </option>
        </select>
      </label>
      <label htmlFor="tag">
        Tag:
      <select
          id="tag"
          data-testid="tag-input"
          onChange={ (e) => {
            localState.tag = e.target.value;
          } }
        >
          <option key={ 'a' } value="Alimentação">
            Alimentação
          </option>
          <option key={ 'b' } value="Lazer">
            Lazer
          </option>
          <option key={ 'c' } value="Trabalho">
            Trabalho
          </option>
          <option key={ 'd' } value="Transporte">
            Transporte
          </option>
          <option key={ 'e' } value="Saúde">
            Saúde
          </option>
        </select>
      </label>
      <label htmlFor="descricao">
        Descrição:
      <input
          type="text"
          id="descricao"
          data-testid="description-input"
          onChange={ (e) => {
            localState.description = e.target.value;
          } }
        />
      </label>
      <button
        type="button"
        onClick={ handleClick }
      >
        Adicionar despesa
      </button>
      {isFetching ? <p>Loading...</p>
        : <p>Completely loaded!</p> }
    </div>
  )
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  ratesJson: state.wallet.ratesJson,
  expenses: state.wallet.expenses,
})

const mapDispatchToProps = (dispatch) => ({
  getRates: () => dispatch(getRates()),
  sendExpenseToGlobalState: (object) => dispatch(sendExpenseToGlobalState(object)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);

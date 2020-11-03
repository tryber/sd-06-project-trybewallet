import React from 'react';
import { connect } from 'react-redux'
import { wallet, fetchData } from '../actions';
import SelectMoeda from './SelectMoeda';
import SelectPagamento from './SelectPagamento';
import SelectCategoria from './SelectCategoria';
import InputValor from './InputValor';
import InputDescricao from './InputDescricao';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      valor: 0,
      descricao: '',
      pagamento: 'Dinheiro',
      categoria: 'Alimentacao',
      moeda: 'USD',
    }
    this.metodoPagamento = this.metodoPagamento.bind(this);
    this.metodoCategoria = this.metodoCategoria.bind(this);
    this.metodoMoeda = this.metodoMoeda.bind(this);
    this.metodoValor = this.metodoValor.bind(this);
    this.metodoDescricao = this.metodoDescricao.bind(this);
    this.metodoButton = this.metodoButton.bind(this);
  }

  metodoValor(e) {
    const valor = e.target.value
    this.setState({
      valor
    })
  }

  metodoDescricao(e) {
    const descricao = e.target.value
    this.setState({
      descricao,
    })
  }

  metodoPagamento(e) {
    const metodoPagamento = e.target.value
    this.setState({
      pagamento: metodoPagamento
    })
  }

  metodoCategoria(e) {
    const categoria = e.target.value
    this.setState({
      categoria,
    })
  }

  metodoMoeda(e) {
    const moeda = e.target.value
    this.setState({
      moeda,
    })
  }

  metodoButton(event) {
    this.props.wallet(this.state);
    const id = this.state.id + 1;
    this.setState({
      id,
    });
    event.preventDefault();
  }

  render() {
    return(
      <div>
        <form>
          <InputValor metodoValor={ this.metodoValor } />
          <InputDescricao metodoDescricao={ this.metodoDescricao } />
          <SelectMoeda  metodoMoeda={ this.metodoMoeda }  />
          <SelectPagamento metodoPagamento={ this.metodoPagamento } />
          <SelectCategoria metodoCategoria={ this.metodoCategoria } />
          {/* <button onClick={ this.metodoButton }>Adicionar despesa</button> */}
         {/* () => this.props.wallet([], this.state) */}
        </form>
        <button onClick={() => this.props.fetch() }>Adicionar despesa</button>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
    wallet: (expenses) => dispatch(wallet(expenses)),
    fetch: () => dispatch(fetchData()),
})

export default connect(
    null, mapDispatchToProps
  )(Expenses);

import React from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../actions';
import SelectMoeda from './SelectMoeda';
import SelectPagamento from './SelectPagamento';
import SelectCategoria from './SelectCategoria';
import InputValor from './InputValor';
import InputDescricao from './InputDescricao';
import Table from './Table';
import '../styles/Expenses.css'

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0, 
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      currency: 'USD',
    }
    this.handleChange = this.handleChange.bind(this);
    this.metodoButton = this.metodoButton.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [e.target.name]: value,
    });
  }

  metodoButton(event) {
    const id = this.state.id + 1;
    this.props.fetch(this.state);
    this.setState({
      id,
    });
    event.preventDefault();
  }

  render() {
    return(
      <div>
        <form>
          <InputValor handleChange={ this.handleChange } value={ this.state.value }/>
          <InputDescricao handleChange={ this.handleChange } />
          <SelectMoeda  handleChange={ this.handleChange }  />
          <SelectPagamento handleChange={ this.handleChange } />
          <SelectCategoria handleChange={ this.handleChange } />
          <button onClick={ this.metodoButton }>Adicionar despesa</button>
        </form>
        <Table />
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
    fetch: (expenses) => dispatch(fetchData(expenses)),
})

export default connect(
    null, mapDispatchToProps
  )(Expenses);

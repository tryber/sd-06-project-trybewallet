import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData } from '../actions';
import SelectMoeda from './SelectMoeda';
import SelectPagamento from './SelectPagamento';
import SelectCategoria from './SelectCategoria';
import InputValor from './InputValor';
import InputDescricao from './InputDescricao';
import Table from './Table';
import '../styles/Expenses.css';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.metodoButton = this.metodoButton.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  metodoButton(event) {
    const { fetch } = this.props;
    const { id } = this.state;
    const newId = id + 1;
    fetch(this.state);
    this.setState({
      id: newId,
    });
    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <form>
          <InputValor handleChange={ this.handleChange } value={ value } />
          <InputDescricao handleChange={ this.handleChange } />
          <SelectMoeda handleChange={ this.handleChange } />
          <SelectPagamento handleChange={ this.handleChange } />
          <SelectCategoria handleChange={ this.handleChange } />
          <button type="submit" onClick={ this.metodoButton }>Adicionar despesa</button>
        </form>
        <Table />
      </div>
    );
  }
}

Expenses.propTypes = {
  fetch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetch: (expenses) => dispatch(fetchData(expenses)),
});

export default connect(
  null, mapDispatchToProps,
)(Expenses);

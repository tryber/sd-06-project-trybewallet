import React from 'react';
import { connect } from 'react-redux';

class Tabela extends React.Component {
	render() {
		const { expenses, currency } = this.props;
		return (
			<table>
				<tr>
					<th>Descrição</th>
					<th>Tag</th>
					<th>Método de pagamento</th>
					<th>Valor</th>
					<th>Moeda</th>
					<th>Câmbio utilizado</th>
					<th>Valor convertido</th>
					<th>Moeda de conversão</th>
				</tr>
				<tr>
					<td>{expenses.description}</td>
					<td>{expenses.tag}</td>
					<td>{expenses.method}</td>
					<td>{expenses.value}</td>
					<td>{expenses}</td>
					<td>{currency}</td>
					<td>{}</td>
					<td>Real</td>
				</tr>
{/* 				<button data-testid="delete-btn">Deletar</button>
				<button data-testid="edit-btn">Editar despesa</button> */}
			</table>
		)
	}
}

const mapStateToProps = (state) => ({
	expenses: state.wallet.expenses,
	currency: state.wallet.currency,
})

export default connect(mapStateToProps)(Tabela);

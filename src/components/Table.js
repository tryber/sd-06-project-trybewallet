// import React from 'react';
// import { connect } from 'react-redux';

// class Table extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {

//   //   };
//   // }

//   render() {
//     const { expenses } = this.props;
//     // const {currency} = expenses;
//     console.log(expenses);
//     return (
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>Descrição</th>
//               <th>Tag</th>
//               <th>Método de pagamento</th>
//               <th>Valor</th>
//               <th>Moeda</th>
//               <th>Câmbio utilizado</th>
//               <th>Valor convertido</th>
//               <th>Moeda de conversão</th>
//             </tr>
//           </thead>
//           <tbody>
//             { expenses.length ? (expenses.map((item) => {
//               const nameOfCoin = item.currency;
//               const finalNameCoin = item.rates[nameOfCoin].name;
//               const finalValueCoin = item.rates[nameOfCoin].ask;
//               const convertedCoin = item.expenses * finalValueCoin;
//               return (
//                 <tr>
//                   <td className="table-cell">{item.description}</td>
//                   <td className="table-cell">{item.tag}</td>
//                   <td className="table-cell">{item.paymentMethod}</td>
//                   <td className="table-cell">{item.expenses}</td>
//                   <td className="table-cell">{finalNameCoin}</td>
//                   <td className="table-cell">{finalValueCoin}</td>
//                   <td className="table-cell">{convertedCoin}</td>
//                   <td className="table-cell">Real</td>
//                   <td>
//                     <div className="edit-expense-container">
//                       <button
//                         type="button"
//                         data-testid="delete-btn"
//                         // onClick={ () => dispatchDeleteExpense(expense.id) }
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })) : (<p>Vazio</p>) }
//             <tr>
//               {/* { expenses.length ? (expenses.map((item) => (<td>{item.currency}</td>))) : (<p>Vazio</p>) } */}
//             </tr>
//           </tbody>
//         </table>
//       </div>

//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
// });

// export default connect(mapStateToProps)(Table);

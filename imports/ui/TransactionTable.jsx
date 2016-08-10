import React, { Component, PropTypes } from 'react';

import Transaction from './Transaction.jsx';

export default class TransactionTable extends Component {
  renderTransactions() {
    let transactions = this.props.transactions.slice();
    if (this.props.adding) {
      const dt = new Date();
      const ds = (dt.getMonth()+1) + "/" + dt.getDate() + "/" + dt.getFullYear();
      transactions.push({
        _id:            "new",
        accountId:      -1,
        amount:         0,
        category:       {},
        date:           ds,
        dateTime:       dt,
        isExpense:      false,
        isInvestment:   false,
        merchant:       "",
        note:           "",
        tags:           [],
        toggleAdding:   this.props.toggleAdding,
      });
    }
    return transactions.map((tx) => (
      <Transaction key={tx._id} _id={tx._id} accountId={tx.accountId} amount={tx.amount} date={tx.date} dateTime={tx.dateTime} isExpense={tx.isExpense} isInvestment={tx.isInvestment} merchant={tx.merchant} note={tx.note} tags={tx.tags} toggleAdding={tx.toggleAdding} />
    ));
  }

  render() {
    const dt = new Date();
    const ds = dt.getMonth() + "/" + dt.getDate() + "/" + dt.getFullYear();
    return(
      <table className="transaction-table">
        <thead><tr>
          <th>Date</th>
          <th>Account</th>
          <th>Merchant</th>
          <th>Note</th>
          <th>Category</th>
          <th>Tags</th>
          <th>Amount</th>
          <th></th>
        </tr></thead>
        <tbody>
          {this.renderTransactions()}
        </tbody>
      </table>
    )
  }
}

TransactionTable.propTypes = {
  adding:       PropTypes.bool.isRequired,
  toggleAdding: React.PropTypes.func,
  transactions: PropTypes.array.isRequired,
};
import React, { Component, PropTypes } from 'react';

import Transaction from './Transaction.jsx';

export default class TransactionTable extends Component {
  renderTransactions() {
    return this.props.transactions.map((tx) => (
      <Transaction key={tx._id} _id={tx._id} accountId={tx.accountId} amount={tx.amount} date={tx.date} isExpense={tx.isExpense} isInvestment={tx.isInvestment} merchant={tx.merchant} note={tx.note} tags={tx.tags} />
    ));
  }

  render() { return(
    <table className="transaction-table">
      <thead><tr>
        <th>Date</th>
        <th>Account</th>
        <th>Merchant</th>
        <th>Note</th>
        <th>Category</th>
        <th>Tags</th>
        <th>Amount</th>
      </tr></thead>
      <tbody>
        {this.renderTransactions()}
      </tbody>
    </table>
  )}
}

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};
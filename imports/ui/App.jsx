import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Transactions } from '../api/transactions.js';

import Transaction from './Transaction.jsx';
  
class App extends Component {
  renderTransactions() {
    return this.props.transactions.map((tx) => (
      <Transaction key={tx._id} _id={tx._id} accountId={tx.accountId} amount={tx.amount} date={tx.date} isExpense={tx.isExpense} isInvestment={tx.isInvestment} merchant={tx.merchant} note={tx.note} tags={tx.tags} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>App Thang</h1>
        </header>

        <table>
          <thead><tr>
            <th>ID</th>
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
      </div>
    );
  }
}

App.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    transactions: Transactions.find({}).fetch(),
  };
}, App);
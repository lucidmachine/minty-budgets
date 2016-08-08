import React, { Component } from 'react';

import Transaction from './Transaction.jsx';
  
export default class App extends Component {
  getTransactions() {
    return [
      { _id: 1, accountId: 1, amount: 1.00, date: "2016-08-08", isExpense: false, isInvestment: false, merchant: "MADE UP MERCHANT", note: "My note about this tx.", category: null, tags: [] },
      { _id: 2, accountId: 1, amount: 1000.00, date: "2016-08-08", isExpense: false, isInvestment: false, merchant: "MADE UP MERCHANT 2", note: "10 C-notes, yo.", category: null, tags: [] },
    ];
  }

  renderTransactions() {
    return this.getTransactions().map((tx) => (
      <Transaction key={tx._id} transaction={tx} />
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
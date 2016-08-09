import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Transactions } from '../api/transactions.js';

import Transaction from './Transaction.jsx';
  
class App extends Component {
  handleSubmit(event) {
    // Stop submit
    event.preventDefault();

    // Insert data
    const amt = Number(Number(ReactDOM.findDOMNode(this.refs.txAmount).value.trim()).toFixed(2));
    const now = new Date();
    Transactions.insert({
      accountId:      1,
      amount:         amt,
      category:       {},
      date:           now.getMonth() + "/" + now.getDate() + "/" + now.getFullYear(),
      isExpense:      false,
      isInvestment:   false,
      merchant:       ReactDOM.findDOMNode(this.refs.txMerchant).value.trim(),
      note:           ReactDOM.findDOMNode(this.refs.txNote).value.trim(),
      tags:           ReactDOM.findDOMNode(this.refs.txTags).value.trim().split(','),
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.txAccount).value='';
    ReactDOM.findDOMNode(this.refs.txMerchant).value='';
    ReactDOM.findDOMNode(this.refs.txNote).value='';
    ReactDOM.findDOMNode(this.refs.txCategory).value='';
    ReactDOM.findDOMNode(this.refs.txTags).value='';
    ReactDOM.findDOMNode(this.refs.txAmount).value='';
  }

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

        <form className="new-transaction" onSubmit={this.handleSubmit.bind(this)}>
          <label>Account<input type="text" ref="txAccount" /></label>
          <label>Merchant<input type="text" ref="txMerchant" /></label>
          <label>Note<textarea ref="txNote" /></label>
          <label>Category<input type="text" ref="txCategory" /></label>
          <label>Tags<input type="text" ref="txTags" /></label>
          <label>Amount<input type="text" ref="txAmount" placeholder="0.00" /></label>
          <button type="submit">Add</button>
        </form>

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
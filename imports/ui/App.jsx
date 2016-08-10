import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Transactions } from '../api/transactions.js';

import TransactionTable from './TransactionTable.jsx';
  
class App extends Component {
  render() {
    return (
      <div className="container">

        <header>
          <h1>App Thang</h1>
        </header>

        <TransactionTable transactions={this.props.transactions} />

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
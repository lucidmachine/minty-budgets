import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Transactions } from '../api/transactions.js';

import TransactionTable from './TransactionTable.jsx';
  
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adding: false,
    };
  }

  toggleAdding(event) {
    this.setState({ adding: !this.state.adding, });
  }

  render() {
    return (
      <div className="container">

        <header>
          <h1>App Thang</h1>
        </header>

        <TransactionTable transactions={this.props.transactions} adding={this.state.adding} toggleAdding={this.toggleAdding.bind(this)} />

        <button className="tx-add" onClick={this.toggleAdding.bind(this)}>Add</button>

      </div>
    );
  }
}

App.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    transactions: Transactions.find({}, { sort: { dateTime: -1 }}).fetch(),
  };
}, App);
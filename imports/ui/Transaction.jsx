import React, { Component, PropTypes } from 'react';

export default class Transaction extends Component {
    render () {
        return (
            <tr className="transaction">
                <td>{this.props.transaction._id}</td>
                <td>{this.props.transaction.accountId}</td>
                <td>{this.props.transaction.merchant}</td>
                <td>{this.props.transaction.note}</td>
                <td>{this.props.transaction.category}</td>
                <td>{this.props.transaction.tags}</td>
                <td>{this.props.transaction.amount}</td>
            </tr>
        );
    }
}

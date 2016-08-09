import React, { Component, PropTypes } from 'react';

export default class Transaction extends Component {
    render () {
        return (
            <tr className="transaction">
                <td>{this.props._id}</td>
                <td>{this.props.accountId}</td>
                <td>{this.props.merchant}</td>
                <td>{this.props.note}</td>
                <td>{this.props.category}</td>
                <td>{this.props.tags.join(', ')}</td>
                <td>{this.props.amount}</td>
            </tr>
        );
    }
}

Transaction.propTypes = {
    _id:            PropTypes.number.isRequired,
    accountId:      PropTypes.number.isRequired,
    amount:         PropTypes.number.isRequired,
    category:       PropTypes.object,
    date:           PropTypes.string.isRequired,
    isExpense:      PropTypes.bool.isRequired,
    isInvestment:   PropTypes.bool.isRequired,
    merchant:       PropTypes.string.isRequired,
    note:           PropTypes.string,
    tags:           PropTypes.array,
}
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

Transaction.propTypes = {
    transaction: PropTypes.object.isRequired,
};

// Transaction.propTypes = {
//     _id:            PropTypes.number.isRequired,
//     accountId:      PropTypes.number.isRequired,
//     amount:         PropTypes.number.isRequired,
//     category:       PropTypes.object,
//     date:           PropTypes.string.isRequired,
//     isExpense:      PropTypes.bool.isRequired,
//     isInvestment:   PropTypes.bool.isRequired,
//     merchant:       PropTypes.string.isRequired,
//     note:           PropTypes.string,
//     tags:           PropTypes.array,
// }
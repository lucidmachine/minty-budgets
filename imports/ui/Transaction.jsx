import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Transactions } from '../api/transactions.js';

export default class Transaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
        };
    }

    resetFormFields() {
        ReactDOM.findDOMNode(this.refs.txAccount).value = this.props.accountId;
        ReactDOM.findDOMNode(this.refs.txAmount).value = this.props.amount;
        ReactDOM.findDOMNode(this.refs.txCategory).value = this.props.category;
        ReactDOM.findDOMNode(this.refs.txDate).value = this.props.date;
        ReactDOM.findDOMNode(this.refs.txMerchant).value = this.props.merchant;
        ReactDOM.findDOMNode(this.refs.txNote).value = this.props.note;
        ReactDOM.findDOMNode(this.refs.txTags).value = this.props.tags.join(',');
    }

    onEditClicked(event) {
        if (!this.state.editing) {
            this.setState({ editing: true, });
        }
    }

    onCancelClicked(event) {
        if (this.state.editing) {
            this.resetFormFields();
            this.setState({ editing: false, });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        
        if (this.state.editing) {
            // Insert data
            const amt = Number(Number(ReactDOM.findDOMNode(this.refs.txAmount).value.trim()).toFixed(2));
            const now = new Date();
            const newData = {
              accountId:      1,
              amount:         amt,
              category:       {},
              date:           now.getMonth() + "/" + now.getDate() + "/" + now.getFullYear(),
              isExpense:      false,
              isInvestment:   false,
              merchant:       ReactDOM.findDOMNode(this.refs.txMerchant).value.trim(),
              note:           ReactDOM.findDOMNode(this.refs.txNote).value.trim(),
              tags:           ReactDOM.findDOMNode(this.refs.txTags).value.trim().split(','),
            };
            Transactions.insert(newData);

            // Stop editing
            this.setState({ editing: false, });
        }
    }

    render () {
        const formId = "tx-form-" + this.props._id;
        const editingClass = this.state.editing ?
            "editing" :
            "saved";
        const rowClass = "transaction " + editingClass;
        return (
            <tr className={rowClass}>
                <td><input form={formId} ref="txDate" type="text" placeholder="MM/DD/YYYY" defaultValue={this.props.date} /></td>
                <td><input form={formId} ref="txAccount" type="text" placeholder="#" defaultValue={this.props.accountId} /></td>
                <td><input form={formId} ref="txMerchant" type="text" placeholder="Merchant" defaultValue={this.props.merchant} /></td>
                <td><input form={formId} ref="txNote" type="text" placeholder="Note" defaultValue={this.props.note} /></td>
                <td><input form={formId} ref="txCategory" type="text" placeholder="Category" defaultValue={this.props.category} /></td>
                <td><input form={formId} ref="txTags" type="text" placeholder="Tags" defaultValue={this.props.tags.join(',')} /></td>
                <td><input form={formId} ref="txAmount" type="text" placeholder="0.00" defaultValue={this.props.amount.toFixed(2)} /></td>
                <td>
                    <form id={formId} className="tx-form" onSubmit={this.onSubmit.bind(this)}>
                        <input type="hidden" ref="txId" name="id" value={this.props._id} />
                        <button type="button" className="tx-edit" onClick={this.onEditClicked.bind(this)}>Edit</button>
                        <button type="submit" className="tx-save">Save</button>
                        <button type="button" className="tx-cancel" onClick={this.onCancelClicked.bind(this)}>Cancel</button>
                    </form>
                </td>
            </tr>
        );
    }
}

Transaction.propTypes = {
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
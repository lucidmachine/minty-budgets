import React, { Component, PropTypes } from 'react';

export default class Transaction extends Component {
    onEditClicked(event) {
        console.log("Edit clicked");
    }

    onSaveClicked(event) {
        console.log("Save clicked");
    }

    onCancelClicked(event) {
        console.log("Cancel clicked");
    }

    onSubmit(event) {
        event.preventDefault();

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
    }

    render () {
        const amt = Number(this.props.amount).toFixed(2);
        const formId = "tx-form-" + this.props._id;
        return (
            <tr className="transaction">
                <td><input form={formId} type="text" placeholder="MM/DD/YYYY" defaultValue={this.props.date} /></td>
                <td><input form={formId} type="text" placeholder="#" defaultValue={this.props.accountId} /></td>
                <td><input form={formId} type="text" placeholder="Merchant" defaultValue={this.props.merchant} /></td>
                <td><input form={formId} type="text" placeholder="Note" defaultValue={this.props.note} /></td>
                <td><input form={formId} type="text" placeholder="Category" defaultValue={this.props.category} /></td>
                <td><input form={formId} type="text" placeholder="Tags" defaultValue={this.props.tags.join(', ')} /></td>
                <td><input form={formId} type="text" placeholder="0.00" defaultValue={amt} /></td>
                <td>
                    <form id={formId} className="tx-form" onSubmit={this.onSubmit.bind(this)}>
                        <input type="hidden" ref="txId" name="id" value={this.props._id} />
                        <button type="button" className="tx-edit" onClick={this.onEditClicked.bind(this)}>Edit</button>
                        <button type="button" className="tx-save" onClick={this.onSaveClicked.bind(this)}>Save</button>
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
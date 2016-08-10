import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Transactions = new Mongo.Collection('transactions');

Meteor.methods({
    'transactions.insert'(tx) {
        check(tx, {
            accountId: Number,
            amount: Number,
            category: Object,
            date: String,
            isExpense: Boolean,
            isInvestment: Boolean,
            merchant: String,
            note: String,
            tags: [Match.Any],
        });

        tx.dateTime = new Date(tx.date);

        Transactions.insert(tx);
    },
    'transactions.remove'(txId) {
        check(txId, String);

        Transactions.remove(txId);
    },
    'transactions.update'(txId, tx) {
        check(txId, String);
        check(tx, {
            _id: String,
            accountId: Number,
            amount: Number,
            category: Object,
            date: String,
            isExpense: Boolean,
            isInvestment: Boolean,
            merchant: String,
            note: String,
            tags: [Match.Any],
        });
        check(txId, tx._id);

        Transactions.update(txId, { $set: tx, });
    },
});
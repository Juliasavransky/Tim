const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    dateOfServes: {
        type: Date,
        required: true
    },
    userProvider: {
        type: String
    },
    status: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
    },
    providerFirstName: {
        type: String
    },
    providerLastName: {
        type: String
    },
    providerEmail: {
        type: String
    },
    providerGender:{
        type: String,
    },

});

module.exports = mongoose.model('orders', OrdersSchema);

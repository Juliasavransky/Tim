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
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    avatar: {
        type: String
    },
    dateOfServes: {
        type: Date,
        required: true
    },
    orderFrom: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    balance: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            balance: {
                type: Number
            },
            date: {
                type: Date,
                default: Date.now
            }
         
        }
    ],
    confirmation: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            title: {
                type: String
            },
            text: {
                type: String,
                require: true,
            },
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }

        }
    ],
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('orders', OrdersSchema);

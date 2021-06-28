const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
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
    fromUser: {
        type: String,
    },
    toUser: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports =  mongoose.model('balance', BalanceSchema);

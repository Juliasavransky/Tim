const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowerCase: true,
        uniq: true,
    },
    password: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
    },
    balance:{
        type: Number,
        require: true,
    },
    profile:{
        type: Schema.Types.ObjectId,
        ref:"profile"
    },
    orders:{
        type: Schema.Types.ObjectId,
        ref: 'orders'
    }
  
  
})

module.exports = User = mongoose.model('user', UserSchema);

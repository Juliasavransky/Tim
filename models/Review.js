const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    writerName: {
        type: String
    },
    writerAvatar: {
        type: String
    }
});

module.exports = Review = mongoose.model('review', ReviewSchema)
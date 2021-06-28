const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    dob: {
        type: Date,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    phone: {
        type: String,
    },
    categories: {
        type: [String],
        require: true,
    },
    subCategories: [{
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }],
    bio: {
        type: String,
    },
    avatar:
    {
        type: [String],
    }
    ,
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema);

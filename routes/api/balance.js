const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Balance = require('../../models/Balance');
// const Orders = require('../../models/orders');


//@route  post api/balance
//@desc  updating a balance
//@access private

router.post('/', [
    auth, [
        body('fromUser', 'Text is required')
            .not()
            .isEmpty(),

        body('toUser', ' rating is required')
            .not()
            .isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newBalance = new Balance({
            fromUser: req.body.text,
            toUser: req.body.text,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            user: req.user.id
        });

        const balance = await newBalance.save();
        res.json(balance);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});



module.exports = router;
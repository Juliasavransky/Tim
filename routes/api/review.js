const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const Review = require('../../models/Review');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


//@route  post api/review
//@desc  create a review
//@access private

router.post('/', [
    auth, [
        body('text', 'Text is required')
            .not()
            .isEmpty(),

        body('rating', ' rating is required')
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

        const newReview = new Review({
            text: req.body.text,
            rating: req.body.rating,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const review = await newReview.save();
        res.json(review);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});

//@route  get api/review/:id
//@desc  get a review by user id
//@access public


//getting all by mistake
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.find( req.params.user_id ).sort({ date: -1 });

        if (!review) {
            return res.status(404).json({ msg: 'Be the firth connecting with this user' });
        }
        res.json(review);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Be the firth connecting with this user' });
        }
        res.status(500).send('Server Error')
    }

});


module.exports = router;
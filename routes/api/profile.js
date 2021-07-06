const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');


const Profile = require('../../models/Profile');
const User = require('../../models/User');




//@route  get api/profile/me
//@desc  get current user profile
//@access private

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.user.id })
            .populate('user', [
                'firstName',
                'lastName',
                'email',
                'gender']);
        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server ERROR')
    }
});

//@route  post api/profile
//@desc  create or update user profile
//@access private

router.post('/', [auth,
    [
        body('categories', "Please select at least one category")
            .not()
            .isEmpty(),

        body('subCategories', "Please enter at least one category")
            .not()
            .isEmpty(),
    ]
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ error: errors.array() });
        }

        const {
            dob,
            city,
            street,
            phone,
            categories,
            subCategories,
            bio,
            avatar,
        } = req.body;

        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;

        if (dob) profileFields.dob = dob;
        if (city) profileFields.city = city;
        if (street) profileFields.street = street;
        if (phone) profileFields.phone = phone;
        if (categories) profileFields.categories = categories;
        if (subCategories) profileFields.subCategories = subCategories;
        if (bio) profileFields.bio = bio;
        if (avatar) profileFields.avatar = avatar;

        try {
            let profile = await Profile
                .findOne({ user: req.user.id });

            if (profile) {
                //update the profile fields
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            //Create the profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500)
                .send('Server Error')
        }

    });

//@route  Get api/profile
//@desc  get all profiles
//@access Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user',
            [
                'firstName',
                'lastName',
                'email',
                'gender'
            ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


});


//@route  Get api/profile/user_id
//@desc  get profile by user id
//@access Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.params.user_id })
            .populate('user',
                [
                    'firstName',
                    'lastName',
                    'email',
                    'gender'
                ]);
        if (!profile)
            return res.status(400)
                .json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400)
                .json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});



//@route  Get api/profiles/category:" str "
//@desc  get profiles by user id
//@access Public

router.get('/categories/:categories', async (req, res) => {
    try {
        const profile = await Profile
            .find({
                categories: req.params.categories
            })

            .populate('user',
                [
                    'firstName',
                    'lastName',
                    'email',
                    'gender'
                ]);
        if (!profile)
            return res.status(400)
                .json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400)
                .json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;


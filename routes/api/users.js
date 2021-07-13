const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const config = require('config')
const User = require('../../models/User');
const auth = require('../../middleware/auth');



//@route  post api/users
//@desc  register user
//@access public

router.post('/',
    [
        body('firstName', ' Firs name is required')
            .not()
            .isEmpty(),

        body('lastName', 'Last name is required')
            .not()
            .isEmpty(),

        body('email', 'Please include a valid email')
            .isEmail(),

        body('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 }),

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const {
            firstName,
            lastName,
            email,
            password,
            gender,
        } = req.body;

        const balance = 2;

        //See if user already exists
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: [{ msg: 'User already exists' }] });
            }

            user = new User({
                firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
                lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
                email,
                gender,
                password,
                balance
            })

            //Encrypt user password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();


            //Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error")
        }


    });



// @route    update api/user/:id
// @desc     update a user balance by user id (payment for service)
// @access   Private

router.patch('/:id', auth, async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            { "_id": req.params.id },
            { $inc: {balance: -1} },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: 'The user does not exist' })
        }

        await user.save();
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// // @route    update api/user/:id
// // @desc     update a user balance by user id ( get payment for service)
// // @access   Private

// router.patch('/:id', auth, async (req, res) => {
//     try {

//         const user = await User.findByIdAndUpdate(
//             { "_id": req.params.id },
//             { $inc: {balance: +1} },
//             { new: true }
//         );

//         if (!user) {
//             return res.status(404).json({ msg: 'The user does not exist' })
//         }

//         await user.save();
//         res.json(user);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }

// });

module.exports = router;
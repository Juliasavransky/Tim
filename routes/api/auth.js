const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

//log-in
const User = require('../../models/User');

//@route  get api/auth
//@desc  test route
//@access public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route  post api/auth
//@desc  Authenticate user & get token
//@access public

router.post('/',
    [

        body('email', 'Please include a valid email')
            .isEmail(),
        body('password', 'Password is required')
            .exists(),

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //See if user already exists
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ error: [{ msg: 'Invalid Credentials' }] });
            }

            // Matching the password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ error: [{ msg: 'Invalid Credentials' }] });
            }

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
module.exports = router;
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const User = require('../../models/User');
const Orders = require('../../models/Orders');
const Profile = require('../../models/Profile');



// @route    POST api/orders
// @desc     Create a order
// @access   Private

router.post(
    '/',
    auth,
    [
        body('text', "Text is required")
            .not()
            .isEmpty(),

        body('dateOfServes', "Date is required")
            .not()
            .isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User
                .findById(req.user.id)
                .select('-password');

            const newOrder = new Orders({
                text: req.body.text,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                user: req.user.id,
                title: req.body.title,
                dateOfServes: req.body.dateOfServes,
                userProvider: req.body.userProvider,
                status: "New"
            })

            const order = await newOrder.save();
            res.json(order);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });



// @route    Get api/orders
// @desc     Get all order
// @access   Private

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Orders
            .find()
            .sort({ date: -1 })
            ;
        res.json(orders);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route    get api/orders/:id
// @desc     get  order by id (order id)
// @access   Private

router.get('/:id', auth, async (req, res) => {
    try {
        const orders = await Orders.findById(req.params.id);

        if (!orders) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        res.json(orders);

    } catch (err) {

        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(500).send('Server error');
    }

});


// @route    delete api/orders/:id
// @desc     delete order by id (order id)
// @access   Private

router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
    try {
        const orders = await Orders.findById(req.params.id);

        if (!orders) {
            return res.status(404).json({ msg: 'Order not found' })
        }

        //Check user auth
        if (orders.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await orders.remove();
        res.json({ msg: 'Order successfully removed' });

    } catch (err) {

        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(500).send('Server error');
    }

});

// 

// @route    Get api/orders/user_id
// @desc     Get orders by user id
// @access   Private

router.get('/user/:user_id', auth, async (req, res) => {
    try {
        const orders = await Orders
            .find({ user: req.params.user_id })
            .sort({ date: -1 })
            .populate('user',
                [
                    'firstName',
                    'lastName',
                    'email',
                    'gender',
                    ' _id'
                ],
                'profile',
                [
                    'dob',
                    'city',
                    'categories',
                    'subCategories',
                    'bio',
                    'avatar',
                    'bio',
                    'date'
                ]
            );
        if (!orders)
            return res.status(400)
                .json({ msg: 'Order not found' });

        res.json(orders);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// @route    update api/orders/:id
// @desc     update a order status by id
// @access   Private

router.patch('/:id', auth, async (req, res) => {

    const { status } = req.body;
    const statusField = {};
    statusField.status = status;

    try {
        let orders = await Orders.findByIdAndUpdate(
            { "_id": req.params.id },
            { $set: statusField },
            { new: true }
        );
        if (!orders) {
            return res.status(404).json({ msg: 'The order does not exist' })
        }

        await orders.save();
        res.json(orders);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error =(');
    }

});


module.exports = router;

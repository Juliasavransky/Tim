const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const User = require('../../models/User');
const Orders = require('../../models/Orders');


// const Balance = require('../../models/Balance');
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
                serviceProvider: req.body.text,
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

router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
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

// @route    put api/orders/balance/:id
// @desc     balance order +1 (order id)
// @access   Private

router.put('/balance/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const orders = await Orders.findById(req.params.id);

        //Check if user has already balance/ payed
        if (orders.balance.filter(balance => balance.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'User already payed' })
        }

        orders.balance.unshift({ user: req.user.id });
        await orders.save();
        res.json(orders.balance);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//****************************************************************************************** */
// @route    put api/orders/balance(delete payment)/:id
// @desc     balance order -1 (order id)
// @access   Private

router.put('/balancedp/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
        const orders = await Orders.findById(req.params.id);

        //Check if user has already balance/ payed
        if (!orders.balance.filter(balance => balance.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'User did not pay yet' })
        }

        //get remove index
        const removeIndex = orders.balance.map(balance => balance.user.toString()).indexOf(req.user.id);

        orders.balance.splice(removeIndex, 1);

        await orders.save();

        res.json(orders.balance);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
//****************************************************************************************** */


// @route    POST api/orders/confirmation/:id
// @desc     confirmation of order (confirmation id)
// @access   Private

router.post(
    '/confirmation/:id',
    auth,
    checkObjectId('id'),
    [
        body('text', "Text is required")
            .not()
            .isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const orders = await Orders.findById(req.params.id);

            const newConfirmation = {
                text: req.body.text,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                user: req.user.id,
                title: req.body.title,
                dateOfServes: req.body.dateOfServes,
            };

            orders.confirmation.unshift(newConfirmation);
            await orders.save();

            res.json(orders.confirmation);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }


    });

// @route    delete api/orders/confirmation/:id/:confirmation_id
// @desc     delete confirmation (confirmation id)
// @access   Private

router.delete('/confirmation/:id/:confirmation_id', auth, async (req, res) => {
    try {
        const orders = await Orders.findById(req.params.id);

        //Pull out confirmation
        const confirmation = orders.confirmation
            .find(confirmation => confirmation.id === req.params.confirmation_id);

        //Make sure confirmation is exists
        if (!confirmation) {
            return res.status(404).json({ msg: 'Confirmation does not exist' })
        }

        //Check if User is the owner of confirmation
        if (confirmation.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        //Get remove index
        const removeIndex = orders.confirmation.map(confirmation => confirmation.user.toString())
            .indexOf(req.user.id);

        orders.confirmation.splice(removeIndex, 1);

        await orders.save();
        res.json(orders.confirmation);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})




//*****************test******** */
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
                    'gender'
                ]);
        if (!orders)
            return res.status(400)
                .json({ msg: 'Order not found' });

        res.json(orders);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
//*****************test******** */

module.exports = router;
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Button, Card, Image } from 'semantic-ui-react'

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { deletePayment, makePayment, deleteOrder } from '../../actions/orders';


const OrderItem = ({
    auth,
    match,
    deletePayment,
    makePayment,
    deleteOrder,
    showActions,
    getProfileById,
    profile,
    order: {
        title,
        text,
        dateOfServes,
        firstName,
        lastName,
        _id,
        avatar,
        balance,
        confirmation,
        date,
        user,
    },
    // profile: { city, dob, categories, subCategories, avatar, bio,
    //     user: { firstName, lastName, gender, email }}

}) => {

    // useEffect(() => {
    //     getProfileById(match.params.id);
    // }, [getProfileById, match.params.id]);

    const paymentHandler = e => {
        // if (!auth.loading && user !== auth.user._id) {
        //     makePayment(_id)
        // } else {

        //     makePayment(_id)
        // }

        makePayment(_id)
    }

    const deletePaymentHandler = e => {
        // if (!auth.loading && user !== auth.user._id) {
        //     deletePayment(_id)
        // } else {

        //     deletePayment(_id)
        // }
        deletePayment(_id)
    }
    const deleteOrderHandler = e => {
        deleteOrder(_id)
        deletePayment(_id)
    }

    const userProfileAvatar = user && user.gender === 'female' ? 'ade' : 'elliot';
    const userProfileImg = avatar && avatar;

    return (
        <Fragment>
            <Card >
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src={userProfileImg
                            ? userProfileImg
                            : `https://react.semantic-ui.com/images/avatar/large/${userProfileAvatar}.jpg`

                        }
                    />

                    <Card.Header>Order from: {firstName && firstName}{' '}{lastName && lastName}</Card.Header>

                    <Card.Description>Order Title: {title && title}</Card.Description>
                    <Card.Description>  Order text: {text && text}  </Card.Description>
                    <Card.Meta> Balance:  </Card.Meta>

                    <Card.Meta> Order created in:
                        <Moment format='DD/MM/YYYY'>{date && date}</Moment>
                    </Card.Meta>

                    <Card.Meta>Order the service for:
                        <Moment format='YYYY/MM/DD'>{dateOfServes && dateOfServes}</Moment>
                    </Card.Meta>

                    {showActions && <Fragment>

                   

                        {!auth.loading && user === auth.user._id && (
                            <Button color="red"
                                onClick={deleteOrderHandler}>delete Order
                            </Button>
                        )}

                        {!auth.loading && user === auth.user._id && (
                            <Link to={`/orders/${_id}`}>
                                <Button color="blue">
                                    Confirm Or add a note
                                </Button>
                            </Link>

                        )}

                        {!auth.loading && user !== auth.user._id
                            ? (
                                <Button color="green"
                                    onClick={paymentHandler}>make payment
                                    <div>  <span style={{ fontSize: '2em', color: 'orange' }}>
                                        <i className="fas fa-piggy-bank"></i>
                                    </span></div>
                                </Button>
                            )
                            : (" ")
                        }

                        {!auth.loading && user !== auth.user._id
                            ? (
                                <Button color="red"
                                    onClick={deletePaymentHandler}>delete payment
                                </Button>
                            )
                            : (" ")
                        }



                        <Card.Description>
                            <Link to={`/userProfile/${user}`}>Go back to
                                <span>{" "}{firstName}{" "} {lastName}{" "} profile</span>
                                <div>{avatar && avatar}</div>

                            </Link>
                        </Card.Description>

                    </Fragment>}

                </Card.Content>
            </Card>
        </Fragment>
    );
};

OrderItem.defaultProps = {
    showActions: true
}

OrderItem.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,

    order: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    makePayment: PropTypes.func.isRequired,
    deletePayment: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders,
    profile: state.profile,
})

export default connect(mapStateToProps, { deletePayment, makePayment, deleteOrder, getProfileById })(OrderItem);
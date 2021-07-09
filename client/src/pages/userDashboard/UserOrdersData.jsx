import React, { Fragment, useEffect } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';
import './userOrdersData.css';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePayment, makePayment, deleteOrder } from '../../actions/orders';
import { getOrdersByUserId } from '../../actions/orders';
import { getCurrentProfile } from '../../actions/profile';



const UserOrdersData = ({
    order: {
        text,
        title,
        dateOfServes,
        firstName,
        lastName,
        _id,
        balance,
        confirmation,
        date,
        user,
    },
    profile: { profile: { city, street, avatar } },
    deletePayment,
    makePayment,
    deleteOrder,
    getCurrentProfile,
    auth,
    match,
}) => {


    useEffect(() => {
        getCurrentProfile()
        console.log()
    }, [getCurrentProfile]);

    const userProfileAvatar = user?.gender === 'female' ? woman : man;
    const userProfileImg = avatar?.length > 0 ? avatar : userProfileAvatar;

    const paymentHandler = e => {
        makePayment(_id)
    }

    const deletePaymentHandler = e => {
        deletePayment(_id)
    }

    const deleteOrderHandler = e => {
        deleteOrder(_id)
        deletePayment(_id)
    }

    return (
        <Card className="userOrdersData--comp">
            <Card.Content className="userOrdersData--content">
                <div className='userOrdersData--border_1'>
                    <div className='userOrdersData--border_2'>
                        <div className='userOrdersData--border_3'>
                            <img 
                            className='userOrdersData--img'
                                src={userProfileImg
                                    ? userProfileImg
                                    : userProfileAvatar
                                }
                            />
                        </div>
                    </div>
                </div>
                <Card.Header>{firstName}{" "}{lastName}</Card.Header>
                <Card.Description>Order Title: {title && title}</Card.Description>

                <Card.Description>  Order text: {text && text}  </Card.Description>
                <Card.Meta>Order the service for:
                    <Moment format='YYYY/MM/DD'>{dateOfServes && dateOfServes}</Moment>
                </Card.Meta>
            </Card.Content>

            <Card.Meta> Balance: {(balance.length) + (auth.user.balance)}  </Card.Meta>
            <Card.Meta> Order created in:
                <Moment format='DD/MM/YYYY'>{date && date}</Moment>
            </Card.Meta>

            <div> confirmation =
                {" "}   {confirmation.length >= 0 && (
                    <span className="comment-count">{confirmation.length}</span>
                )}
            </div>
            <Link to={`/userDashboard`}>Go back to profile!!

            </Link>

            <Card.Content className="userOrdersData--content">
                <div className='userOrdersData--uiTwoButtons'>

                    <Link to={`/orders/${_id}`}>
                        <Button color="blue">
                            Add a note
                        </Button>
                    </Link>

                    <Button color="red"
                        onClick={deleteOrderHandler}>delete Order
                    </Button>

                </div>
            </Card.Content>
        </Card>
    );
};

UserOrdersData.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    getOrdersByUserId: PropTypes.func.isRequired,
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

export default connect(mapStateToProps,
    {
        getCurrentProfile,
        deletePayment,
        makePayment,
        deleteOrder,
        getOrdersByUserId,
    })(UserOrdersData);
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Button, Card, Image } from 'semantic-ui-react'

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, deleteOrder } from '../../actions/orders';
import { getPayment, makePayment } from '../../actions/auth';



const OrderItem = ({
    auth,
    match,
    getPayment,
    makePayment,
    updateStatus,
    deleteOrder,
    profile,
    order: {
        title,
        text,
        dateOfServes,
        firstName,
        lastName,
        _id,
        avatar,
        date,
        user,
        userProvider,
        status
    }

}) => {
    const [newStatus, setNewstatus] = useState('');

    useEffect(() => {
        updateStatus(_id, newStatus)
    }, [updateStatus, newStatus]);

    const chengeStatusHandler = (newStatus, userProvider, user) => {
        setNewstatus(newStatus);

        if (newStatus === 'Approved') {
            // getPayment(userProvider)
            makePayment(user)
        }

        if (newStatus === 'Denied') {
            console.log('todo')
        }
    }



    const deleteOrderHandler = e => {
        deleteOrder(_id)
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
                    <div>userProvider: {userProvider}</div>
                    <div>status: {status}</div>




                    {!auth.loading && user === auth.user._id && (
                        <Button color="red"
                            onClick={deleteOrderHandler}>delete Order
                        </Button>
                    )}



                    <Card.Description>
                        <Link to={`/userProfile/${user}`}>Go back to
                            <span>{" "}{firstName}{" "} {lastName}{" "} profile</span>
                            <div>{avatar && avatar}</div>

                        </Link>
                    </Card.Description>

                    <Card.Content className="userOrdersData--content">
                        <div className='userOrdersData--uiTwoButtons'>


                            <Button color="green"
                                onClick={() => chengeStatusHandler('Approved')}
                            >
                                Approved
                            </Button>


                            <Button color="green"
                                onClick={() => chengeStatusHandler('Denied')}>
                                Denied
                            </Button>

                        </div>
                    </Card.Content>
                </Card.Content>
            </Card>
        </Fragment>
    );
};

OrderItem.propTypes = {
    profile: PropTypes.object.isRequired,
    updateStatus: PropTypes.func.isRequired,
    getPayment: PropTypes.func.isRequired,
    makePayment: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders,
    profile: state.profile,
})

export default connect(mapStateToProps, {
    deleteOrder,
    updateStatus,
    getPayment,
    makePayment
})(OrderItem);

    //  {!auth.loading && user === auth.user._id && (
    //                     <Link to={`/orders/${_id}`}>
    //                         <Button color="blue">
    //                             Confirm Or add a note
    //                         </Button>
    //                     </Link>

    //                 )}
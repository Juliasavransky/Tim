import React ,{Fragment} from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePayment, makePayment, deleteOrder } from '../../actions/orders';
import { getOrdersByUserId } from '../../actions/orders';


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
        avatar,
        user,
    },
    // profile: {  city, street, },
    deletePayment,
    makePayment,
    deleteOrder,
    auth,
    match,
}) => {
    const userProfileAvatar = user.gender && user.gender === 'female' ? 'ade' : 'elliot';
    const userProfileImg = avatar && avatar;

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
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={userProfileImg
                        ? userProfileImg
                        : `https://react.semantic-ui.com/images/avatar/large/${userProfileAvatar}.jpg`
                    }
                />
                <Card.Header>{firstName}{" "}{lastName}</Card.Header>
                <Card.Description>Order Title: {title && title}</Card.Description>

                <Card.Description>  Order text: {text && text}  </Card.Description>
                <Card.Meta>Order the service for:
                    <Moment format='YYYY/MM/DD'>{dateOfServes && dateOfServes}</Moment>
                </Card.Meta>
            </Card.Content>

            <Card.Meta> Balance: {(balance.length)+(auth.user.balance)}  </Card.Meta>
            <Card.Meta> Order created in:
                <Moment format='DD/MM/YYYY'>{date && date}</Moment>
            </Card.Meta>

            <div> confirmation =
                {" "}   {confirmation.length >= 0 && (
                    <span className="comment-count">{confirmation.length}</span>
                )}
            </div>
            <Link to={`/userDashboard`}>Go back to profile
                <div>{avatar && avatar}</div>

            </Link>

            <Card.Content >
                <div className='ui two buttons'>

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
        deletePayment,
        makePayment,
        deleteOrder,
        getOrdersByUserId
    })(UserOrdersData);
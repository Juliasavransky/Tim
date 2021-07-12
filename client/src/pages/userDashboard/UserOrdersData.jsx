import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';
import './userOrdersData.css';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrdersByUserId } from '../../actions/orders';




const UserOrdersData = ({
    order: {
        text,
        title,
        dateOfServes,
        firstName,
        lastName,
        _id,
        date,
        user,
        userProvider,
        status,
    },
    profile,
    deleteOrder,
    getProfileById,
    auth,
    match,
}) => {

    const userProfileAvatar = user?.gender === 'female' ? woman : man;
    const userProfileImg = profile.avatar?.length > 0 ? profile.avatar : userProfileAvatar;

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

            <h1>{status}</h1>
            <h3>user Provider: {userProvider}</h3>

            <Card.Meta> Order created in:
                <Moment format='DD/MM/YYYY'>{date && date}</Moment>
            </Card.Meta>


            <Link to={`/userDashboard`}>Go back to profile!!

            </Link>

            <Card.Content className="userOrdersData--content">
                <div className='userOrdersData--uiTwoButtons'>

                    <Link to={`/orders/${_id}`}>
                        <Button color="blue">
                            More detels
                        </Button>
                    </Link>

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
    getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    orders: state.orders,
    profile: state.profile,
})

export default connect(mapStateToProps, { getOrdersByUserId, })(UserOrdersData);
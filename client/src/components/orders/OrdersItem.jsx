import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Button } from 'semantic-ui-react';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';
import './orderItem.css';

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

    const chengeStatusHandler = (newStatus) => {
        setNewstatus(newStatus);

        if (newStatus === "Denied") {
            updateStatus(_id, newStatus);
            return
        }
        if (newStatus === "Approved") {
            updateStatus(_id, newStatus);
            makePayment(user);
            getPayment(userProvider);
        }
    }



    const deleteOrderHandler = e => {
        deleteOrder(_id)
    }

    const userProfileAvatar = user && user.gender === 'female' ? woman : man;
    const userProfileImg = avatar && avatar;

    // className={`blabla ${newStatus=== "Denied"? "allgray":"allgreen"}`}

    return (

        <div className="orderItem--comp" >
            <h2>The order status : {status}</h2>
            <div className="orderItem--borders">
                <div className="orderItem--border1">
                    <div className="orderItem--border2">
                        <div className="orderItem--border3">
                            <img className="orderItem--img"
                                src={userProfileImg
                                    ? userProfileImg
                                    : userProfileAvatar
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <h1>
                Order from:
                {firstName && firstName}{' '}{lastName && lastName}
            </h1>

            <h3>Order Title: {title && title}</h3>
            <p>  Order text: {text && text}  </p>


            <div> Order created in:
                <Moment format='DD/MM/YYYY'>
                    {date && date}
                </Moment>
            </div>

            <div>Order the service for:
                <Moment format='YYYY/MM/DD'>
                    {dateOfServes && dateOfServes}
                </Moment>
            </div>




            <div className="userOrdersData--content">
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


                    <Button color="red"
                        onClick={deleteOrderHandler}>delete Order
                    </Button>

                    <h4>
                        <Link to={`/userProfile/${userProvider}`}>Go back to user Provider profile
                        </Link>
                    </h4>

                </div>
            </div>
        </div>
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
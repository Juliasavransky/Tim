import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';
import './orderItem.css';
import { Message } from 'semantic-ui-react';


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
        status,
        providerEmail,
        providerFirstName,
        providerLastName,
        providerGender,

    }

}) => {
    const [newStatus, setNewstatus] = useState('');
    const [touserDashboard, setTouserDashboard] = useState(false);
    const [error, setError] = useState();

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const chengeStatusHandler = (newStatus) => {
        setNewstatus(newStatus);

        if (status === "Approved") {
            sleep(3000).then(() => { setTouserDashboard(true) })
            return setError({
                title: 'Sory,This order has been approved',
                message: 'Cannot approved more than onese'
            })

        }
        
        if (newStatus === "Denied") {
            updateStatus(_id, newStatus);
            sleep(3000).then(() => { setTouserDashboard(true) })
            return
        }
        if (newStatus === "Approved") {
            updateStatus(_id, newStatus);
            makePayment(user);
            getPayment(userProvider);
        }

        setTouserDashboard(true);
    }

    const deleteOrderHandler = e => {
        setTouserDashboard(true);
        deleteOrder(_id);

    }

    const userProfileAvatar = user && user.gender === 'female' ? woman : man;
    const userProfileImg = avatar && avatar;

    // className={`blabla ${newStatus=== "Denied"? "allgray":"allgreen"}`}

    //Redirect if user shange the status 
    if (touserDashboard) {
        return <Redirect to="/userDashboard" />
    }
    return (

        <div className="orderItem--comp" >
            {error && <Message negative>
                <Message.Header>{error.title}</Message.Header>
                <p>{error.message}</p>
            </Message>}
            <div className="orderItem--heders">
                <h1>
                    Order from:
                    {" "}{providerFirstName && providerFirstName}{' '}{providerLastName && providerLastName}
                </h1>
                <h2>The order status : {status}</h2>
            </div>


            <div className="test">


                <div className="orderItem--content-right">

                    <h2> Title: <br />{title && title}</h2>
                    <p> Message details: <br /> {text && text}  </p>

                    <h4>Order the service for:{" "}
                        <Moment format='YYYY/MM/DD'>
                            {dateOfServes && dateOfServes}
                        </Moment>
                    </h4>



                    <h5>
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: " var(--yellow)"
                            }}
                            to={`/userProfile/${userProvider}`}>
                            Go back to{" "}
                            {providerFirstName && providerFirstName}{" "}

                            {providerLastName && providerLastName}{" "}
                            profile
                        </Link>
                    </h5>

                    <h6 >
                        <a
                            style={{
                                textDecoration: 'none', color: "var(--pink)"
                            }}
                            href={`mailto:${providerEmail && providerEmail}?subject=Hello,%20this%20is%20${providerFirstName}%20${providerLastName}%20from%20the%20Time%20bank`}>
                            <br /> For more information contact <br />
                            <i className="far fa-paper-plane"></i>{" "}
                            {providerFirstName && providerFirstName}
                            {' '}
                            {providerLastName && providerLastName}{" "}
                        </a>
                    </h6>
                    <h3> Order send in:
                        <Moment format='DD/MM/YYYY'>
                            {date && date}
                        </Moment>
                    </h3>
                </div>

                <div className="orderItem--content-left">

                    <div className="orderItem--borders">
                        <div className="orderItem--border1">
                            <div className="orderItem--border2">
                                <div className="orderItem--border3">
                                    <img
                                        className="orderItem--img"
                                        src={userProfileImg
                                            ? userProfileImg
                                            : userProfileAvatar
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="orderItem--btn">
                        <a
                            style={{
                                color: "var(--notWhite)",
                                background: 'var(--red)',
                            }}
                            onClick={deleteOrderHandler}>Delete Order
                        </a>
                    </div>

                    {!auth.loading && auth?.user?._id != user && (
                        <div className="orderItem--btn" >

                            <a
                                style={{ color: "var(--notWhite)" }}
                                onClick={() => chengeStatusHandler('Approved')}
                            >
                                Approved
                            </a>

                            <a
                                style={{ color: "var(--notWhite)" }}
                                onClick={() => chengeStatusHandler('Denied')}>
                                Denied
                            </a>

                        </div>
                    )}

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
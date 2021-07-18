import React, { Fragment, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import UserOrdersData from './UserOrdersData';
import ProviderOrderData from './../usersList/ProviderOrderData';


//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrdersByUserId } from '../../actions/orders';





const UserOrders = ({
    getOrdersByUserId,
    orders: { orders, loading },
    profile: { profile },
    auth, match
}) => {

    useEffect(() => {
        getOrdersByUserId(match.params.id);
    }, [getOrdersByUserId, match.params.id]);


    const orderByUserProvider = [];
    const orderByUserOdrer = [];

    orders?.map(order => {
        if ((order?.user?._id) === (auth?.user?._id)) {
            orderByUserOdrer.push(order)
        } else {
            orderByUserProvider.push(order)
        }
    });

    return orders === null || loading
        ? <Spinner />
        : <Fragment>
            <h2
                style={{
                    fontSize: '3em',
                    color: "var(--yellow)",
                    width: '25rem',
                    margin:"3rem"
                }}>
                My Balance {" "}{auth?.user?.balance}{" "}
                <i className="fas fa-piggy-bank">
                </i>
            </h2>

            <div className="userOrders">
                <div className="userOrdersData--comp">
                    <h1>My Orders</h1>

                    {orderByUserOdrer.length > 0
                        ? (orderByUserOdrer.map(order => (
                            <UserOrdersData
                                key={order._id}
                                order={order}
                                profile={profile}

                            />
                        ))) : <div>You have not made any orders yet</div>}
                </div>

                <div className="userOrdersData--comp">
                    <h1>My Customers</h1>

                    {orderByUserProvider.length > 0
                        ? (orderByUserProvider.map(order => (
                            <ProviderOrderData
                                key={order._id}
                                order={order}
                                profile={profile}

                            />
                        ))) : <div>No one has ordered your service yet</div>}
                </div>



            </div>

        </Fragment>;

};



UserOrders.propTypes = {
    getOrdersByUserId: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
    orders: state.orders,
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getOrdersByUserId })(UserOrders);

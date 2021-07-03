import React, { Fragment, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import UserOrdersData from './UserOrdersData';

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



    return orders === null || loading
        ? <Spinner />
        : <Fragment>
            {orders.length > 0
                ? (orders.map(order => (
                    <UserOrdersData
                        key={order._id}
                        order={order}
                        profile={profile}
                    />
                ))) : <h3>No orders </h3>
            }


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
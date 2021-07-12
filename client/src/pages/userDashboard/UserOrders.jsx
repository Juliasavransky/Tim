import React, { Fragment, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import UserOrdersData from './UserOrdersData';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


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
            <h1>My activities</h1>

            <h2
                style={{ fontSize: '2em', color: "var(--yellow)" }}>
                My Balance {" "}
                <i className="fas fa-piggy-bank">
                </i>

            </h2>

            {orders.length > 0
                ? (orders.map(order => (
                    <UserOrdersData
                        key={order._id}
                        order={order}
                        profile={profile}

                    />
                ))) : <Fragment>


                    <h3>No orders </h3>
                    <Link to="/searchPage">
                        <Button content='find new activity' size='big' />
                    </Link>
                </Fragment>
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
import React, { Fragment, useEffect } from 'react';
import Spinner from '../Spinner';
import OrderItem from './OrdersItem';
import OrdersForm from './OrdersForm';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';



const Orders = ({
    getOrders,
    orders: { orders, loading },
    getProfileById,
    profile: { profile },
    auth,
    match
}) => {

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return loading
        ? <Spinner />
        : <Fragment>
            {orders.map(order => (
                <OrderItem
                    key={order._id}
                    order={order}
                    // profile={profile}
                    // auth={auth}
                    // match={match}

                />
            ))}

            {profile === null || loading
                ? <Spinner />
                : <Fragment>
                    <OrdersForm
                        key={profile._id}
                        profile={profile}
                      
                    />

                </Fragment>
            }

        </Fragment>;
};

Orders.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    orders: state.orders,
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {  getProfileById })(Orders);
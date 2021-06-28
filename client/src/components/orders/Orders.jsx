import React, { Fragment, useEffect } from 'react';
import Spinner from '../Spinner';
import OrderItem from './OrdersItem';
import OrdersForm from './OrdersForm';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/orders';


const Order = ({
    getOrders,
    orders:
    { orders, loading }
}) => {

    useEffect(() => {
        getOrders();
    }, [getOrders])



    return loading 
        ? <Spinner />
        : <Fragment>
            {orders.map(order =>(
            <OrderItem key={order._id} order={order}/>
            ))}
            <OrdersForm />
        </Fragment>;
};

Order.propTypes = {
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    orders: state.orders
});

export default connect(mapStateToProps, { getOrders })(Order);
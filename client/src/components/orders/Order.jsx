import React, { Fragment, useEffect } from 'react';
import Spinner from '../Spinner';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrder } from '../../actions/orders';
import OrdersItem from './OrdersItem';



const Order = ({
    getOrder,
    orders: {
        order,
        loading,
    },
    match 
}) => {

    useEffect(() => {
        getOrder(match.params.id);
    }, [getOrder, match.params.id]);


    return loading || order === null
        ? (<Spinner />)
        : (
            <Fragment>

                <OrdersItem
                    order={order && order}
                />

            </Fragment>
        );
};


Order.propTypes = {
    getOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    order: state.order,
    orders: state.orders

})

export default connect(mapStateToProps, { getOrder })(Order);
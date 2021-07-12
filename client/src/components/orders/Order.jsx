import React, { Fragment, useEffect } from 'react';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

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

             
                <Link to='/usersList'>
                    <Button>go  back to users list</Button>
                </Link>

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
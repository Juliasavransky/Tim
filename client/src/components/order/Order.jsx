import React, { Fragment, useEffect } from 'react';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrder } from '../../actions/orders';
import OrdersItem from '../../components/orders/OrdersItem';
import ConfirmationForm from './ConfirmationForm';
import ConfirmationItem from './ConfirmationItem';



const Order = ({
    getOrder,
    order: {
         order,
        loading,
    },

    match }) => {

    useEffect(() => {
        getOrder(match.params.id);

    }, [getOrder, match.params.id]);


    //     return loading || order === null
    //         ?( <Spinner />)
    //         : (
    //         // <Fragment>


    //         //     <Link to='/usersList'>
    //         //         <Button>go  back to users list</Button>
    //         //     </Link>
    //         //     <OrdersItem
    //         //         order={order}
    //         //         showActions={false}
    //         //     />
    //               <ConfirmationForm 
    //                       orderId={order._id} 
    //                />
    // {order.Confirmation.map(confirmation =>(
    //   <ConfirmationItem
    //     key={confirmation._id}
    //     confirmation={confirmation}
    //     orderId={order._id}
    //     />
    // ))}
    //         // </Fragment>
    //         );

    return (

        <h1>
            <ConfirmationForm
            // orderId={order._id} 
            />
        </h1>
    );


};


Order.propTypes = {
    getOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    order: state.order
})

export default connect(mapStateToProps, { getOrder })(Order);
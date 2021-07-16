import axios from 'axios';

//redux
import { setAlert } from './alert';

import {
    GET_ORDERS,
    ORDERS_ERROR,
    DELETE_ORDER,
    ADD_ORDER,
    GET_ORDER,
    GET_ORDERS_BYUSER_ID,
    UPDATE_ORDER_STATUS,

} from './types.js';

// Get orders
export const getOrders = () => async dispatch => {
    try {
        const res = await axios.get('/api/orders');

        dispatch({
            type: GET_ORDERS,
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}



// Delete order 
export const deleteOrder = orderId => async dispatch => {
    try {
        const res = await axios.delete(`/api/orders/${orderId}`);

        dispatch({
            type: DELETE_ORDER,
            payload: orderId
        });

        dispatch(setAlert('Order Deleted', 'success'));

    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// Add order 
export const addOrder = (formData) => async dispatch => {
    try {
        const res = await axios.post('/api/orders', (formData));

        dispatch({
            type: ADD_ORDER,
            payload: res.data
        });

        dispatch(setAlert('Order Created', 'success'));

    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// Get order 1
export const getOrder = orderId => async dispatch => {
    try {
        console.log("orderId", orderId);
        const res = await axios.get(`/api/orders/${orderId}`);

        dispatch({
            type: GET_ORDER,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// Get orders by user id
export const getOrdersByUserId = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/orders/user/${userId}`);

        dispatch({
            type: GET_ORDERS_BYUSER_ID,
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}



// Updete order status (from new to approved or denied )
export const updateStatus = (orderId, newStatus, edit = false) => async dispatch => {
    try {
        console.log(orderId, newStatus);
        const res = await axios.patch(`/api/orders/${orderId}`, { status: newStatus });

        dispatch({
            type: UPDATE_ORDER_STATUS,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'The order approved' : '', 'success'));


    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}


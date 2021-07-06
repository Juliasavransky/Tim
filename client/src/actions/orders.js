import axios from 'axios';

//redux
import { setAlert } from './alert';

import {
    GET_ORDERS,
    ORDERS_ERROR,

    UPDATE_PAYMENT,
    DELETE_ORDER,

    ADD_ORDER,
    GET_ORDER,

    ADD_CONFIRMATION,
    DELETE_CONFIRMATION,

    GET_ORDERS_BYUSER_ID
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

// Make payment = balance
export const makePayment = balanceId => async dispatch => {
    try {
        const res = await axios.put(`/api/orders/balance/${balanceId}`);

        dispatch({
            type: UPDATE_PAYMENT,
            payload: { balanceId, balance: res.data }
        });

    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// Delete payment = (balancedp = balance delete payment)
export const deletePayment = balanceId => async dispatch => {
    try {
        const res = await axios.put(`/api/orders/balancedp/${balanceId}`);

        dispatch({
            type: UPDATE_PAYMENT,
            payload: { balanceId, balance: res.data }
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
        const res = await axios.post('/api/orders',( formData));

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

// Add confirmation 
export const addConfirmation = (orderId, formData) => async dispatch => {
    try {
        const res = await axios.post(`/api/orders/confirmation/${orderId}`, formData);

        dispatch({
            type: ADD_CONFIRMATION,
            payload: res.data
        });

        dispatch(setAlert('confirmation Created', 'success'));

    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// Delete confirmation 
export const deleteConfirmation = (orderId, confirmationId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/orders/confirmation/${orderId}/${confirmationId}`);

        dispatch({
            type: DELETE_CONFIRMATION,
            payload: confirmationId
        });

        dispatch(setAlert('confirmation Deleted', 'success'));

    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

//*********test************************************* */

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
import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    MAKE_PAYMENT,
    GET_PAYMENT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Loading user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });

    }
};

//register user
export const register = (formData) => async dispatch => {

    try {
        const res = await axios.post('/api/users', formData);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }

}

//login user
export const login = (formData) => async (dispatch) => {

    try {
        const res = await axios.post('/api/auth', formData);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }

}

//LOGOUT
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}

// Make payment =( balance -1 login user)
export const makePayment = userId => async dispatch => {
    try {
        const res = await axios.patch(`/api/users/make-payment/${userId}`);

        dispatch({
            type: MAKE_PAYMENT,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}


// Make payment =( balance +1 user Provader user)
export const getPayment = userId => async dispatch => {
    try {
        const res = await axios.patch(`/api/users/get-payment/${userId}`);

        dispatch({
            type: GET_PAYMENT,
            payload: res.data
        });



    } catch (err) {
        dispatch({

            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

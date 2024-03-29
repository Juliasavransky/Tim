import axios from 'axios';

//redux
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,

    GET_PROFILES,
    CLEAR_PROFILE,

    GET_PROFILES_BY_CATEGORIES,
    
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: CLEAR_PROFILE
        });

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


//Create or update profile**************

export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const res = await axios.post('/api/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/userDashboard')
        }
    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get all profiles
export const getProfiles = () => async dispatch => {
    // dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get profile by id
export const getProfileById = userId => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);


        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//********************************************* */
//Get order for profile by id 
export const getProfileOrderById = userId => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/orders/${userId}`);


        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//*******************getProfileByCategories************************** */

//Get order for profile by id 
export const getProfileByCategories = categories => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/categories/${categories}`);


        dispatch({
            type: GET_PROFILES_BY_CATEGORIES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
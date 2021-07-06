import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    GET_PROFILES_BY_CATEGORIES,

} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILES:
        case GET_PROFILES_BY_CATEGORIES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state;
    }
}
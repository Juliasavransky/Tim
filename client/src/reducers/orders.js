import {
    GET_ORDERS,
    ORDERS_ERROR,
    DELETE_ORDER,
    ADD_ORDER,
    GET_ORDER,
    GET_ORDERS_BYUSER_ID,
    UPDATE_ORDER_STATUS,

} from '../actions/types';


const initialState = {
    orders: [],
    order: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ORDERS:
        case GET_ORDERS_BYUSER_ID:
            return {
                ...state,
                orders: payload,
                loading: false
            };
        case GET_ORDER:
        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                order: payload,
                loading: false,
            }
        case ADD_ORDER:
            return {
                ...state,
                orders: [payload, ...state.orders],
                loading: false
            }

        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== payload),
                loading: false
            }
        case ORDERS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };

        default:
            return state;
    }
}


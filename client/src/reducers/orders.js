import {
    GET_ORDERS,
    ORDERS_ERROR,

    UPDATE_PAYMENT,
    DELETE_ORDER,

    ADD_ORDER,
    GET_ORDER,

    ADD_CONFIRMATION,
    DELETE_CONFIRMATION
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
            return {
                ...state,
                orders: payload,
                loading: false
            };
        case GET_ORDER:
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
        case UPDATE_PAYMENT:
            return {
                ...state,
                orders: state.orders.map(order => order._id === payload.id
                    ? { ...order, balance: payload.balance }
                    : order
                ),
                loading: false

            }
        case ADD_CONFIRMATION:
            return {
                ...state,
                order: { ...state.order, confirmation: action.payload },
                loading: false
            }

        case DELETE_CONFIRMATION:
            return {
                ...state,
                order: {
                    ...state.order,
                    confirmation: state.order.confirmation
                    .filter(confirmation => confirmation._id !== payload)
                },
                loading: false

            }

        default:
            return state;
    }
}
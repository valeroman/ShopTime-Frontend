import {
    CREATE_STRIPE_PAYMENT_INTENT_FAIL,
    CREATE_STRIPE_PAYMENT_INTENT_SUCCESS,
    GET_PAYMENT_TOTAL_FAIL,
    GET_PAYMENT_TOTAL_SUCCESS,
    LOAD_BT_TOKEN_FAIL,
    LOAD_BT_TOKEN_SUCCESS,
    MADE_STRIPE_PAYMENT,
    PAYMENT_FAIL,
    PAYMENT_SUCCESS,
    REMOVE_PAYMENT_LOADING,
    RESET_PAYMENT_INFO,
    SET_PAYMENT_LOADING
} from '../actions/types';

const initialState = {
    clientToken: null,
    clientSecret: null,
    made_payment: false,
    original_price: 0.0,
    total_after_coupon: 0.0,
    total_amount: 0.0,
    total_compare_amount: 0.0,
    estimated_tax: 0.0,
    shipping_cost: 0.0,
    loading: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PAYMENT_TOTAL_SUCCESS:
            return {
                ...state,
                original_price: payload.original_price,
                total_after_coupon: payload.total_after_coupon,
                total_amount: payload.total_amount,
                total_compare_amount: payload.total_compare_amount,
                estimated_tax: payload.estimated_tax,
                shipping_cost: payload.shipping_cost
            };

        case GET_PAYMENT_TOTAL_FAIL:
            return {
                ...state,
                original_price: 0.0,
                total_after_coupon: 0.0,
                total_amount: 0.0,
                total_compare_amount: 0.0,
                estimated_tax: 0.0,
                shipping_cost: 0.0
            };

        case LOAD_BT_TOKEN_SUCCESS:
            return {
                ...state,
                clientToken: payload.braintree_token
            };

        case LOAD_BT_TOKEN_FAIL:
            return {
                ...state,
                clientToken: null
            };

        case PAYMENT_SUCCESS:
            return {
                ...state,
                made_payment: true
            };

        case PAYMENT_FAIL:
            return {
                ...state,
                made_payment: false
            };

        case SET_PAYMENT_LOADING:
            return {
                ...state,
                loading: true
            };

        case REMOVE_PAYMENT_LOADING:
            return {
                ...state,
                loading: false
            };

        case RESET_PAYMENT_INFO:
            return {
                ...state,
                made_payment: false,
                clientToken: null
            };

        case CREATE_STRIPE_PAYMENT_INTENT_SUCCESS:
            return {
                ...state,
                clientSecret: payload.clientSecret
            };

        case CREATE_STRIPE_PAYMENT_INTENT_FAIL:
            return {
                ...state,
                clientSecret: null
            };

        case MADE_STRIPE_PAYMENT:
            return {
                ...state,
                clientSecret: null,
                made_payment: true
            };

        default:
            return state;
    }
}
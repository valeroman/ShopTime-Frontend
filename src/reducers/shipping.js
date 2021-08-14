import { GET_SHIPPING_OPTION_FAIL, GET_SHIPPING_OPTION_SUCCESS } from '../actions/types';

const initialState = {
    shipping: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SHIPPING_OPTION_SUCCESS:
            return {
                ...state,
                shipping: payload.shipping_options
            };

        case GET_SHIPPING_OPTION_FAIL:
            return {
                ...state,
                shipping: null
            };

        default:
            return state;
    }
}
import axios from 'axios';
import { ADD_ITEM, ADD_ITEM_FAIL, ADD_ITEM_SUCCESS, EMPTY_CART, EMPTY_CART_FAIL, EMPTY_CART_SUCCESS, GET_ITEMS, GET_ITEMS_FAIL, GET_ITEMS_SUCCESS, GET_ITEM_TOTAL, GET_ITEM_TOTAL_FAIL, GET_ITEM_TOTAL_SUCCESS, GET_TOTAL, GET_TOTAL_FAIL, GET_TOTAL_SUCCESS, REMOVE_ITEM, REMOVE_ITEM_FAIL, REMOVE_ITEM_SUCCESS, SYNCH_CART_FAIL, SYNCH_CART_SUCCESS, UPDATE_ITEM, UPDATE_ITEM_FAIL, UPDATE_ITEM_SUCCESS } from './types';

export const add_item = product => async dispatch => {


    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${ localStorage.getItem('access') }`
            }
        };

        const product_id = product.id;
        const body = JSON.stringify({ product_id });

        try {

            const res = await axios.post(`${ process.env.REACT_APP_API_URL }/api/cart/add-item`, body, config);

            if (res.status === 201) {
                dispatch({
                    type: ADD_ITEM_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: ADD_ITEM_FAIL
                });
            }

        } catch (error) {
            dispatch({
                type: ADD_ITEM_FAIL
            });
        }


    } else {

        let cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        let shouldAddItem = true;

        cart.map((item) => {
            if (product.id.toString() === item.product.id.toString()) {
                shouldAddItem = false;
            }
        });

        const order_item = {
            product: product,
            count: 1
        };

        if (shouldAddItem) {
            cart.push(order_item);
        }

        dispatch({
            type: ADD_ITEM,
            payload: cart
        });
    }

};

export const get_items = () => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${ localStorage.getItem('access') }`
            }
        };

        try {

            const res = await axios.get(`${ process.env.REACT_APP_API_URL }/api/cart/cart-items`, config);

            if (res.status === 200) {

                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: GET_ITEMS_FAIL
                });
            }

        } catch (error) {

            dispatch({
                type: GET_ITEMS_FAIL
            });

        }

    } else {

        dispatch({
            type: GET_ITEMS
        });
    }
};

export const get_total = () => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${ localStorage.getItem('access') }`
            }
        };

        try {

            const res = await axios.get(`${ process.env.REACT_APP_API_URL }/api/cart/get-total`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_TOTAL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_TOTAL_FAIL
                });
            }

        } catch (error) {
            dispatch({
                type: GET_TOTAL_FAIL
            });
        }

    } else {

        let total = 0.00;
        let compare_total = 0.00;
        let cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));

            cart.map(item => {
                total += parseFloat(item.product.price) * parseFloat(item.count);
                compare_total += parseFloat(item.product.compare_price) * parseFloat(item.count);
            });
        }

        dispatch({
            type: GET_TOTAL,
            payload: [parseFloat(total.toFixed(2)), parseFloat(compare_total.toFixed(2))]
        });
    }
};

export const get_item_total = () => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${ localStorage.getItem('access') }`
            }
        };

        try {

            const res = await axios.get(`${ process.env.REACT_APP_API_URL }/api/cart/get-item-total`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ITEM_TOTAL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_ITEM_TOTAL_FAIL
                });
            }

        } catch (error) {
            dispatch({
                type: GET_ITEM_TOTAL_FAIL
            });
        }

    } else {

        let total = 0;

        if (localStorage.getItem('cart')) {
            total = JSON.parse(localStorage.getItem('cart')).length;
        }

        dispatch({
            type: GET_ITEM_TOTAL,
            payload: total
        });
    }
};

export const update_item = (item, count) => async dispatch => {

    console.log('item', item);

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${ localStorage.getItem('access') }`
            }
        };

        const product_id = item.product.id;
        const body = JSON.stringify({ product_id, count });

        try {

            const res = await axios.put(`${ process.env.REACT_APP_API_URL }/api/cart/update-item`, body, config);

            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: UPDATE_ITEM_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: UPDATE_ITEM_FAIL
                });
            }

        } catch (error) {
            dispatch({
                type: UPDATE_ITEM_FAIL
            });
        }


    } else {

        let cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));

            cart.map((cart_item, index) => {
                if (cart_item.product.id.toString() === item.product.id.toString()) {
                    cart[index].count = parseInt(count);
                }
            });
        }

        dispatch({
            type: UPDATE_ITEM,
            payload: cart
        });
    }
};

export const remove_item = (item) => async dispatch => {

    if (localStorage.getItem('access')) {

        const product_id = item.product.id;
        const body = JSON.stringify({ product_id });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${ localStorage.getItem('access') }`
            },
            data: body
        };


        try {

            const res = await axios.delete(`${ process.env.REACT_APP_API_URL }/api/cart/remove-item`, config);

            if (res.status === 200) {
                dispatch({
                    type: REMOVE_ITEM_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REMOVE_ITEM_FAIL
                });
            }

        } catch (error) {
            dispatch({
                type: REMOVE_ITEM_FAIL
            });
        }

    } else {

        let cart = [];
        let new_cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));

            cart.map(cart_item => {
                if (cart_item.product.id.toString() !== item.product.id.toString()) {
                    new_cart.push(cart_item)
                }
            });
        }

        dispatch({
            type: REMOVE_ITEM,
            payload: new_cart
        });
    }
};

export const empty_cart = () => async dispach => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${ localStorage.getItem('access') }`
            }
        };

        try {

            const res = await axios.delete(`${ process.env.REACT_APP_API_URL }/api/cart/empty-cart`, config);

            if (res.status === 200) {
                dispach({
                    type: EMPTY_CART_SUCCESS,
                });
            } else {
                dispach({
                    type: EMPTY_CART_FAIL
                });
            }
        } catch (error) {
            dispach({
                type: EMPTY_CART_FAIL
            });
        }

    } else {

        dispach({
            type: EMPTY_CART
        });
    }
};

export const synch_cart = () => async dispach => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${ localStorage.getItem('access') }`
        }
    };

    let cart_items = [];

    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));

        cart.map(cart_item => {
            const item = {};
            item.product_id = cart_item.product.id;
            item.count = cart_item.count;
            cart_items.push(item);
        });
    }

    const body = JSON.stringify({ cart_items });

    try {

        const res = await axios.put(`${ process.env.REACT_APP_API_URL }/api/cart/synch`, body, config);

        if (res.status === 201) {
            dispach({
                type: SYNCH_CART_SUCCESS
            });
        } else {
            dispach({
                type: SYNCH_CART_FAIL
            });
        }

    } catch (error) {
        dispach({
            type: SYNCH_CART_FAIL
        });
    }
}
import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_COUPON_FAIL,
    GET_COUPON_SUCCESS
} from './types';

export const check_coupon = (coupon_name) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${ localStorage.getItem('access') }`
        }
    };

    try {
        const res = await axios.get(`${ process.env.REACT_APP_API_URL }/api/coupon/check-coupon?coupon_name=${ coupon_name }`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COUPON_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Coupon applied', 'success'));
        } else {
            dispatch({
                type: GET_COUPON_FAIL
            });

            if (res.data.error) {
                dispatch(setAlert(res.data.error, 'danger'));
            } else {
                dispatch(setAlert('This cupon does not exist', 'danger'));
            }
        }
    } catch (error) {
        dispatch({
            type: GET_COUPON_FAIL
        });
        dispatch(setAlert('This cupon does not exist', 'danger'));
    }

    window.scrollTo(0, 0);
};
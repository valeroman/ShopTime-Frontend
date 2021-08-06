import axios from 'axios';
import { setAlert } from './alert';
import {
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    GOOGLE_AUTH_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_FAIL,
    REFRESH_SUCCESS,
    REMOVE_AUTH_LOADING,
    RESET_PASSWORD_CONFIRM_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    SET_AUTH_LOADING,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS
} from './types';

export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
    });

    try {

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });

            dispatch(setAlert('We sent you an email, please activate your account ', 'success'));

        } else {
            dispatch({
                type: SIGNUP_FAIL
            });

            dispatch(setAlert('Error creating account', 'danger'));
        }

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: SIGNUP_FAIL
        });

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        dispatch(setAlert('Error creating account', 'danger'));
    }
}

export const activate = (uid, token) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });

    try {

        const res = await axios.post(`${ process.env.REACT_APP_API_URL }/auth/users/activation/`, body, config);

        if (res.status === 204) {

            dispatch({
                type: ACTIVATION_SUCCESS
            });

            dispatch(setAlert('Successfully activated your account', 'success'));

        } else {

            dispatch({
                type: ACTIVATION_FAIL
            });

            dispatch(setAlert('Error activating account', 'danger'));
        }

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

    } catch (error) {

        dispatch({
            type: ACTIVATION_FAIL
        });

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        dispatch(setAlert('Error activating account', 'danger'));
    }
};

export const login = (email, password) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email,
        password
    });

    try {

        const res = await axios.post(`${ process.env.REACT_APP_API_URL }/auth/jwt/create/`, body, config);

        if (res.status === 200) {

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            dispatch(loaded_user());

            dispatch({
                type: REMOVE_AUTH_LOADING
            });

            dispatch(setAlert('Logged in successfully', 'success'));

        } else {

            dispatch({
                type: LOGIN_FAIL
            });

            dispatch({
                type: REMOVE_AUTH_LOADING
            });

            dispatch(setAlert('Error authenticating', 'danger'));
        }


    } catch (error) {

        dispatch({
            type: LOGIN_FAIL
        });

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        dispatch(setAlert('Error authenticating', 'danger'));
    }
};

export const loaded_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `JWT ${ localStorage.getItem('access') }`,
                'Accept': 'application/json'
            }
        };

        try {

            const res = await axios.get(`${ process.env.REACT_APP_API_URL }/auth/users/me/`, config);

            if (res.status === 200) {

                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });

            } else {

                dispatch({
                    type: USER_LOADED_FAIL
                });
            }


        } catch (error) {

            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const check_authenticated = () => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        });

        try {

            const res = await axios.post(`${ process.env.REACT_APP_API_URL }/auth/jwt/verify/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }

        } catch (error) {

            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {

        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);

            if (res.status === 200) {

                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });

            } else {

                dispatch({
                    type: REFRESH_FAIL
                });

            }

        } catch (error) {

            dispatch({
                type: REFRESH_FAIL
            });
        }

    } else {

        dispatch({
            type: REFRESH_FAIL
        });
    }
};

export const logout = () => dispatch => {

    dispatch({
        type: LOGOUT
    });

    dispatch(setAlert('Loggout Out', 'success'));
};

export const reset_password = (email) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {

        const res = await axios.post(`${ process.env.REACT_APP_API_URL }/auth/users/reset_password/`, body, config);

        if (res.status === 204) {

            dispatch({
                type: RESET_PASSWORD_SUCCESS
            });

            dispatch({
                type: REMOVE_AUTH_LOADING
            });

            dispatch(setAlert('Password reset email sent', 'success'));

        } else {

            dispatch({
                type: RESET_PASSWORD_FAIL
            });

            dispatch({
                type: REMOVE_AUTH_LOADING
            });

            dispatch(setAlert('Error sending password reset email', 'danger'));
        }


    } catch (error) {

        dispatch({
            type: RESET_PASSWORD_FAIL
        });

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        dispatch(setAlert('Error sending password reset email', 'danger'));
    }

};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password
    });

    if (new_password !== re_new_password) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        dispatch(setAlert('Password do not match', 'danger'));
    } else {

        try {

            const res = await axios.post(`${ process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

            if (res.status === 204) {

                dispatch({
                    type: RESET_PASSWORD_CONFIRM_SUCCESS
                });

                dispatch({
                    type: REMOVE_AUTH_LOADING
                });

                dispatch(setAlert('Password has been reset successfully', 'success'));

            } else {

                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                });

                dispatch({
                    type: REMOVE_AUTH_LOADING
                });

                dispatch(setAlert('Error reseting your password', 'danger'));
            }

        } catch (error) {

            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            });

            dispatch({
                type: REMOVE_AUTH_LOADING
            });

            dispatch(setAlert('Error reseting your password', 'danger'));
        }
    }
};

export const google_autenticate = (state, code) => async dispatch => {

    if (state && code && !localStorage.getItem('access')) {

        dispatch({
            type: SET_AUTH_LOADING
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencode'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const fromBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {

            const res = await axios.post(`${ process.env.REACT_APP_API_URL }/auth/o/google-oauth2/?${ fromBody }`, config);

            if (res.status === 201) {

                dispatch({
                    type: GOOGLE_AUTH_SUCCESS,
                    payload: res.data
                });

                dispatch(loaded_user());

                dispatch({
                    type: SET_AUTH_LOADING
                });

                dispatch(setAlert('Logged in successfully', 'success'));

            } else {

                dispatch({
                    type: GOOGLE_AUTH_FAIL
                });

                dispatch({
                    type: SET_AUTH_LOADING
                });

                dispatch(setAlert('Error authenticating', 'danger'));

            }


        } catch (error) {

            dispatch({
                type: GOOGLE_AUTH_FAIL
            });

            dispatch({
                type: SET_AUTH_LOADING
            });

            dispatch(setAlert('Error authenticating', 'danger'));
        }
    }
};

export const facebook_autenticate = (state, code) => async dispatch => {

    if (state && code && !localStorage.getItem('access')) {

        dispatch({
            type: SET_AUTH_LOADING
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencode'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const fromBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {

            const res = await axios.post(`${ process.env.REACT_APP_API_URL }/auth/o/facebook/?${ fromBody }`, config);

            if (res.status === 201) {

                dispatch({
                    type: FACEBOOK_AUTH_SUCCESS,
                    payload: res.data
                });

                dispatch(loaded_user());

                dispatch({
                    type: SET_AUTH_LOADING
                });

                dispatch(setAlert('Logged in successfully', 'success'));

            } else {

                dispatch({
                    type: FACEBOOK_AUTH_FAIL
                });

                dispatch({
                    type: SET_AUTH_LOADING
                });

                dispatch(setAlert('Error authenticating', 'danger'));

            }


        } catch (error) {

            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });

            dispatch({
                type: SET_AUTH_LOADING
            });

            dispatch(setAlert('Error authenticating', 'danger'));
        }
    }
}
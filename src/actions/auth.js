import {
    SIGNIN_SUCCESS,
    SIGNOUT_SUCCESS,
    SIGNIN_ERROR,
    LOADING_START,
    LOADING_END,
} from '../reducers/auth-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function signInSuccess(data) {
    return {
        type: SIGNIN_SUCCESS,
        payload: data,
    }
}

function signOutSuccess(data) {
    return {
        type: SIGNOUT_SUCCESS,
        payload: data,
    }
}

function signInError(error) {
    return {
        type: SIGNIN_ERROR,
        payload: error,
    }
}

function loading(bool) {
    return {
        type: bool ? LOADING_START : LOADING_END,
        payload: bool,
    }
}

export function Login(email, password, history) {
    return async (dispatch) => {
        try {
            dispatch(loading(true));
            const data = await axios.post(`${BASE_URL}/auth/shopUserSignIn`, {
                email,
                password,
            }, {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            if (data.data.data.type !== 'SHOP_USER') {
                throw new Error('incorect token');
            }
            dispatch(signInSuccess(data.data.data));
            window.localStorage.setItem('accessToken', data.data.data.accessToken);
            history.push('/private');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(signInError(error.response.data.errors));
            } else {
                alert(error.message)
                dispatch(signInError(error.message));
            }
        }
        finally {
            dispatch(loading(false));
        }
    };
}
export function IsSignIn(token) {
    return async (dispatch) => {
        try {
            dispatch(loading(true));
            const data = await axios.get(`${BASE_URL}/auth/shopUserIsSignIn`, {
                headers: {
                    'Authorization': token,
                }
            });
            dispatch(signInSuccess(data.data.data));
        } catch (error) {
            dispatch(signInError(error.response.data.errors));
        }
        finally {
            dispatch(loading(false));
        }
    };
}
export function Logout(history) {
    return async (dispatch) => {
        try {
            window.localStorage.clear();
            dispatch(signOutSuccess({}));
            history.push('/signin');
        } catch (error) {
            alert('something wrong');
        }
    };
}
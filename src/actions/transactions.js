import {
    TRANSACTION_ERROR,
    GET_TRANSACTIONS_LOADING,
    GET_BONUS_CUMULATE_SUCCESS,
    GET_BONUS_SPEND_SUCCESS,
    STORE_CARD_INFO_SUCCESS,
    GET_CARD_USER_INFO_SUCCESS,
    SET_CARD_NUMBER,
} from '../reducers/transactions-reducer';
import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

function actionError(error) {
    return {
        type: TRANSACTION_ERROR,
        payload: error,
    }
}
function getTransactionsLoading(data) {
    return {
        type: GET_TRANSACTIONS_LOADING,
        payload: data
    }
}
function getBonusCumulateSussess(data) {
    return {
        type: GET_BONUS_CUMULATE_SUCCESS,
        payload: data
    }
}
function getBonusSpendSuccess(data) {
    return {
        type: GET_BONUS_SPEND_SUCCESS,
        payload: data
    }
}
function storeCardInfoSuccess(data) {
    return {
        type: STORE_CARD_INFO_SUCCESS,
        payload: data
    }
}
function getCardUserByNumberSuccess(data){
    return {
        type: GET_CARD_USER_INFO_SUCCESS,
        payload: data
    }
}
function setCardNumber(cardNumber){
    return {
        type: SET_CARD_NUMBER,
        payload: cardNumber,
    }
}
export function GetBonusCumulate(cardNumber, total, typeId, history, note = undefined) {
    return async (dispatch) => {
        try {
            dispatch(getTransactionsLoading(true));
            const data = await axios.post(`${BASE_URL}/transaction`, {
                cardNumber,
                total,
                typeId,
                note,
            },{
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getBonusCumulateSussess(data));
            history.push('/private');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(getTransactionsLoading(false));
        }
    };
}
export function GetBonusSpend(cardNumber, total, history) {
    return async (dispatch) => {
        try {
            dispatch(getTransactionsLoading(true));
            const data = await axios.post(`${BASE_URL}/transaction/spend`, {
                cardNumber,
                total,
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('accessToken'),
                }
            });
            dispatch(getBonusSpendSuccess(data));
            history.push('/private');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(getTransactionsLoading(false));
        }
    };
}
export function CardInfo(id, type, history) {
    return async (dispatch) => {
        try {
            dispatch(storeCardInfoSuccess({ id, type}));
            history.push('/cardNumber');
        } catch (error) {
            alert('somethin wrong');
        }
    };
}
export function GetCardUserByNumber(cardNumber, history) {
    return async (dispatch) => {
        try {
            dispatch(getTransactionsLoading(true));
            const data = await axios.post(`${BASE_URL}/transaction/info`, {
                cardNumber
            },
                {
                    headers: {
                        'Authorization': window.localStorage.getItem('accessToken'),
                    }
                });
            dispatch(setCardNumber(cardNumber))
            dispatch(getCardUserByNumberSuccess(data.data.data));
            history.push('/transaction');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(getTransactionsLoading(false));
        }
    };
} 
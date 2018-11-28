export const TRANSACTION_ERROR = 'TRANSACTION_ERROR';
export const GET_TRANSACTIONS_LOADING = 'GET_USERS_LOADING';
export const GET_BONUS_CUMULATE_SUCCESS = 'GET_BONUS_CUMULATE_SUCCESS';
export const GET_BONUS_SPEND_SUCCESS = 'GET_BONUS_SPEND_SUCCESS';
export const STORE_CARD_INFO_SUCCESS = 'STORE_CARD_INFO_SUCCESS';
export const GET_CARD_USER_INFO_SUCCESS = 'GET_CARD_USER_INFO_SUCCESS';
export const SET_CARD_NUMBER = 'SET_CARD_NUMBER';

const initStore = {
    loading: false,
    user: {},
    data: {},
    cardNumber: '',
    error: "",
}
const TransactionsReducer = (store = initStore, action) => {
    switch (action.type) {
        case TRANSACTION_ERROR:
            return { ...store, error: action.payload };
        case GET_TRANSACTIONS_LOADING:
            return { ...store, loading: action.payload };
        case GET_BONUS_CUMULATE_SUCCESS:
            return { ...store, user: {}, data: {}, cardNumber: '' };
        case GET_BONUS_SPEND_SUCCESS:
            return { ...store, user: {}, data: {}, cardNumber: '' };
        case STORE_CARD_INFO_SUCCESS:
            return { ...store, data: action.payload };
        case GET_CARD_USER_INFO_SUCCESS:
            return { ...store, user: action.payload };
        case SET_CARD_NUMBER:
            return { ...store, cardNumber: action.payload };
        default:
            return store;
    }
}
export default TransactionsReducer;
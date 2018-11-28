import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import TransactionsReducer from './transactions-reducer';

export default combineReducers({
    user: AuthReducer,
    transactions: TransactionsReducer,
});
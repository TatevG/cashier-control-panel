export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'
export const SIGNIN_ERROR = 'SIGNIN_ERROR';
export const LOADING_START = 'LOADING_START';
export const LOADING_END = 'LOADING_END';


const initStore = {
    loading: false,
    data: {},
    isSignIn: false,
    error: '',
}
const AuthReducer = (store = initStore, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            return { ...store, isSignIn: true, data: action.payload };
        case SIGNIN_ERROR:
            return { ...store, isSignIn: false, error: action.payload };
        case LOADING_START:
            return { ...store, loading: action.payload };
        case LOADING_END:
            return { ...store, loading: action.payload };
        case SIGNOUT_SUCCESS:
            return { ...store, isSignIn: false, data: action.payload };
        default:
            return store;
    }

}
export default AuthReducer;
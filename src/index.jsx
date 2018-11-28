import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/storeConfig';
import Root from './containers/root';
import Modal from './components/modal';
import '../public/styles/index.scss';
import Axios from 'axios';

const store = configureStore();
setInterval(() => {
    if (window.localStorage.getItem('accessToken')) {
        Axios.get(`${process.env.BASE_URL}/shop/ping`, {
            headers: {
                'Authorization': window.localStorage.getItem('accessToken'),
            }
        });
    }
}, 900000)
render(
    <div>
        <Provider store={store} >
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        </Provider>
        <Modal ref={(Modal) => { window.modal = Modal }} />
    </div>
    ,
    document.getElementById('app')
);
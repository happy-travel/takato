import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { initApplication } from './htcore';
import settings from './settings';
import 'antd/dist/antd.min.css';
import './style/style.sass';
import {message, Spin} from 'antd';

initApplication({
    settings,
    getLocale: () => 'en',
    showNotification: (text, type) => {
        if (type === 'Error') {
            return message.error(text, 10);
        }
        if (type === 'Information') {
            return message.info(text, 10);
        }
        return message.warning(text, 10);
    },
    onLogin: (auth) => {
        console.log('auth-OK', auth); //todo
    },
    onLogout: () => {
        console.log('logout'); //todo
    },
    Loader: () => <div className="loader-holder"><Spin size="large" /></div>
});

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

import { history } from './helpers/history';
import { store } from './helpers/store.js';
import { Provider } from 'react-redux';

import {
    Router,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();

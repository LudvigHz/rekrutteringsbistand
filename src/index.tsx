import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import './index.less';
import '@navikt/ds-css';

const history = createBrowserHistory();

if (process.env.REACT_APP_MOCK) {
    require('./mock/mock-api');
}

ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('rekrutteringsbistand-container')
);

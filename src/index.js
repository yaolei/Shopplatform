import React from 'react';
import './styles/style.less';
import ReactDOM from 'react-dom';
import './vendors/w3ds-3/w3ds-3.8.0';
import './vendors/w3ds-3/w3ds-3.8.0.css';
import { Provider } from 'react-redux';
import Reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import Routes from './routes';
import MainMiddleWare from './middlewares/mainMiddleWare';
import {setCurrentLanguageSign} from './util/BaseLanguage'

const createStoreWithMiddleware = applyMiddleware(
    MainMiddleWare,
    thunk
)(createStore);

setCurrentLanguageSign('English');

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducers) }>
        <Router history={browserHistory} routes={Routes}/>
    </Provider>,
    document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderRedcer from './store/reducers/order';
import loadingReducer from './store/reducers/loading';
import authReducer from './store/reducers/auth';


import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderRedcer,
    loading: loadingReducer,
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'

import reducer from './reducers'

import './index.css'
import App from './components/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename='/Readable'>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

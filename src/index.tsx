import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import logger from 'redux-logger';
import { createStore, applyMiddleware, combineReducers, Middleware } from 'redux';
import { StoreState } from './types/index';
import { contestants } from './reducers/kingsApiReducers'
import { latLon, categoryId } from './reducers/globalPreferenceReducers'
import thunk from 'redux-thunk';


const middleware: Middleware[] = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger, thunk);
}

const store = createStore<StoreState>(
  combineReducers({
    contestants,
    latLon,
    categoryId
  }),
  applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store} >
    <AppContainer />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
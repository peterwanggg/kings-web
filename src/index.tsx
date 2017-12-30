import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import logger from 'redux-logger';
import { createStore, applyMiddleware, combineReducers, Middleware } from 'redux';
import { StoreState } from './types/index';
import { contestants } from './reducers/kingsApiReducers'
import { fetchChallengers } from './actions/kingsApiActions'
import thunk from 'redux-thunk';

const middleware: Middleware[] = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger, thunk);
}

const store = createStore<StoreState>(
  combineReducers({
    contestants
  }),
  applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store} >
    <Hello
      lat={47.6522155000}
      lon={-122.3543657000}
      challengerContestantId={4}
      fetchChallengers={fetchChallengers}
      contestants={JSON.parse('""')}
    >
      hi?
    </Hello>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import logger from 'redux-logger';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { contestants } from './reducers/ContestantReducers'
import { latLon, categoryType, categoryId, categories, boutMode, contestantModal, categoriesTop, rankType, } from './reducers/GlobalReducers'
import { Link } from 'react-router-dom';
import BoutRoute from './routes/BoutRoute';
import CategoriesRoute from './routes/CategoriesRoute';
import { BOUT_ROUTE, CATEGORIES_ROUTE } from './constants/index';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

const middleware: Middleware[] = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger, thunk, routerMiddleware(history));
}

const store = createStore(
  combineReducers({
    contestants,

    latLon,
    categoriesTop,
    categoryType,
    categoryId,
    categories,

    boutMode,
    rankType,

    contestantModal,
    router: routerReducer
  }),
  applyMiddleware(...middleware)
)

const App = () => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`/bouts`}>
          Bouts
        </Link>
      </li>
      <li>
        <Link to={`/categories`}>
          Categories
        </Link>
      </li>
      <li>
      </li>
    </ul>
  </div>
)

// default route
store.dispatch(push(CATEGORIES_ROUTE))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path={BOUT_ROUTE} component={BoutRoute} />
        <Route path={CATEGORIES_ROUTE} component={CategoriesRoute} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from './App';
// import { Provider } from 'react-redux';
// import registerServiceWorker from './registerServiceWorker';
// // import './index.css';
// import logger from 'redux-logger';
// import { createStore, applyMiddleware, combineReducers, Middleware } from 'redux';
// import { StoreState } from './types/index';
// import { contestants } from './reducers/ContestantReducers'
// import { latLon, categoryType, categoryId, categories, boutMode, contestantModal } from './reducers/GlobalReducers'
// import thunk from 'redux-thunk';
// import { contestants } from './reducers/ContestantReducers'
// import { latLon, categoryType, categoryId, categories, boutMode, contestantModal } from './reducers/GlobalReducers'

// const middleware: Middleware[] = [thunk];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(logger, thunk);
// }

// const store = createStore<StoreState>(
//   combineReducers({
//     contestants,

//     latLon,
//     categoryType,
//     categoryId,
//     categories,

//     boutMode,

//     contestantModal,
//   }),
//   applyMiddleware(...middleware));

// ReactDOM.render(
//   <Provider store={store} >
//     <App />
//   </Provider>,
//   document.getElementById('root') as HTMLElement
// );
// registerServiceWorker();


import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import logger from 'redux-logger';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import { contestants } from './reducers/ContestantReducers'
import { latLon, categoryType, categoryId, categories, boutMode, contestantModal } from './reducers/GlobalReducers'
import { Link } from 'react-router-dom';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// const middleware = routerMiddleware(history)
const middleware: Middleware[] = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger, thunk, routerMiddleware(history));
}

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    contestants,

    latLon,
    categoryType,
    categoryId,
    categories,

    boutMode,

    contestantModal,
    router: routerReducer
  }),
  applyMiddleware(...middleware)
)








const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }: any) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
const Topics = ({ match }: any) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
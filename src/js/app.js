import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import createHistory from 'history/createHashHistory';
import {Route, Switch} from 'react-router';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import RootContainer from './containers/RootContainer';
import DayContainer from './containers/DayContainer';
import WeekContainer from './containers/WeekContainer';
import MonthContainer from './containers/MonthContainer';
import calendar from './reducers';
import logger from './middlewares/logger';
import {processTransition} from './actions/navigation';

const NODE_TO_MOUNT = document.getElementById('root');
const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers = composeWithDevTools({});

const store = createStore(
    combineReducers({
      calendar,
      router: routerReducer
    }),
    composeEnhancers(
        applyMiddleware(thunk, middleware, logger)
    )
);

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RootContainer>
          <Switch>
            <Route path="/day/:date" component={DayContainer}/>
            <Route path="/week/:date" component={WeekContainer}/>
            <Route path="/month/:date" component={MonthContainer}/>
            <Route component={WeekContainer}/>
          </Switch>
        </RootContainer>
      </ConnectedRouter>
    </Provider>,
    NODE_TO_MOUNT
);


// first loading doesn't emit history change event
store.dispatch(processTransition(history.location.pathname));


history.listen(location => {
  store.dispatch(processTransition(location.pathname));
});

// if ('serviceWorker' in navigator) { //TODO: uncomment before send
//   navigator.serviceWorker
//   .register('./sw.js')
//   .then(() => {
//     console.log('Service Worker Registered');
//   });
// }

import styles from '../css/app.less'; // import styles

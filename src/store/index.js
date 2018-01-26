import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

// redux-thunk를 사용하지 않을때 batch action 처리
function enableBatching(reducers) {
  return function batchingReducer(state, action) {
    switch (action.type) {
      case 'BATCH_ACTIONS':
        return action.actions.reduce(batchingReducer, state);
      default:
        return reducers(state, action);
    }
  };
}

// logger option
const logger = createLogger({ collapsed: true });

const middlewares = [thunk];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(logger);
}

export default createStore(
  enableBatching(reducers),
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);

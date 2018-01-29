import { combineReducers } from 'redux-immutable';

import router from './router';
import { order } from './order';
import { auth } from './auth';
import { ui } from './ui';
import { setting } from './setting';
import nav from './navigation';
import { authentication } from './authentication';

export default combineReducers({
  router,
  order,
  auth,
  ui,
  setting,
  nav,
  authentication,
});

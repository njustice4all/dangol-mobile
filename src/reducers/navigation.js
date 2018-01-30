import { NavigationActions } from 'react-navigation';

import { router } from '../screens/AppNavigator';

// const initialState = router.getStateForAction(NavigationActions.init());
const initialState = router.getStateForAction(router.getActionForPathAndParams('Splash'));

export default (state = initialState, action) => {
  const newState = router.getStateForAction(action, state);
  return newState || state;
};

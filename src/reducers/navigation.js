import { router } from '../screens/AppNavigator';

const initialState = router.getStateForAction(router.getActionForPathAndParams('Auth'));

export default (state, action) => {
  const newState = router.getStateForAction(action, state);
  return newState || state;
};

import { AsyncStorage } from 'react-native';

export const initialApp = () => async dispatch => {
  dispatch({ type: 'INITIALIZE_APP' });

  const user = await AsyncStorage.getItem('user').catch(error => {
    dispatch({ type: 'auth/LOGIN_ERROR', payload: error });
  });

  console.log(JSON.parse(user));

  if (!user) {
    dispatch({ type: 'auth/LOGIN_ERROR', payload: 'no user!' });
  } else {
    dispatch({ type: 'auth/LOGIN_SUCCESS', payload: JSON.parse(user) });
  }
};

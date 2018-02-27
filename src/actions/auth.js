import { AsyncStorage } from 'react-native';
import { apiInitSignin } from '../api';

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

/**
 * 로그인
 */
const reqSignin = () => ({ type: 'auth/REQ_SIGNIN' });
const reqSigninSuccess = (info, user) => ({ type: 'auth/REQ_SIGNIN_SUCCESS', info, user });
const reqSigninError = errors => ({ type: 'auth/REQ_SIGNIN_ERROR', errors });

export const initSignin = user => async dispatch => {
  dispatch(reqSignin());

  const response = await apiInitSignin(user);
  const result = await response.json();

  if (result.msg !== 'ok') {
    dispatch(reqSigninError(errors));
    return { redirect: false, isLogin: false };
  } else {
    dispatch(reqSigninSuccess({ ...result }, user));
    // dispatch(initGetCoords(info));
    if (result.first === '1') {
      return { redirect: true, role: result.role, isLogin: true };
    }
    return { redirect: false, isLogin: true };
  }
};

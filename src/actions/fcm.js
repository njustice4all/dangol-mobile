export const setToken = token => ({
  type: 'firebase/SET_TOKEN',
  token,
});

export const initSetToken = token => async dispatch => {
  dispatch(setToken);

  if (true) {
    dispatch(setTokenSuccess({ success: true }));
  } else {
    dispatch(setTokenError({ error: true }));
  }
};

const getToken = () => ({
  type: 'firebase/GET_TOKEN',
});

const getTokenSuccess = token => ({
  type: 'firebase/GET_TOKEN_SUCCESS',
  token,
});

const getTokenError = error => ({
  type: 'firebase/GET_TOKEN_ERROR',
  error,
});

export const initGetToken = id => async dispatch => {
  dispatch(getToken());

  if (true) {
    dispatch(getTokenSuccess({ token: 'hey' }));
  } else {
    dispatch(getTokenError({ error: true }));
  }
};

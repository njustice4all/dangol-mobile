const initialState = {
  isLogin: false,
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case '@@INIT':
      return state;
    case 'auth/LOGIN_SUCCESS':
      return { isLogin: true };
    default:
      return state;
  }
};

const initialState = {
  isLogin: false,
  getMembers: false,
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case '@@INIT':
      return state;
    case 'auth/LOGIN_SUCCESS':
      return { isLogin: true };
    case 'web/GET_MEMBERS':
      return { ...state, getMembers: true };
    case 'web/RESET_MEMBERS':
      return { ...state, getMembers: false };
    default:
      return state;
  }
};

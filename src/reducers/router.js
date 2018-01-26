const initRouter = {
  location: null,
};

const router = (state = initRouter, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        location: action.payload,
      };
    default:
      return state;
  }
};

export default router;

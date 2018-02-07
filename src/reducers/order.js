import { Record, List, Map, fromJS } from 'immutable';

const StateRecord = Record({
  lists: new List(),
  doneLists: new List(),
  detail: new Map({
    order: new Map({
      no: '',
      type: '',
      date: '',
      paymentMethod: '',
      totalPay: 0,
      status: 'pending',
      option: '',
    }),
    customer: new Map({
      phone: '',
      address: '',
      request: '',
    }),
    products: new List(),
  }),
  isFetching: false,
  status: new Map({
    error: false,
    msg: '',
  }),
  popupVisible: false,
});

const getNewLists = (state, action) => {
  return state.withMutations(s => s.set('isFetching', false).set('lists', fromJS(action.lists)));
};

const errorOnFetching = (state, action) => {
  const errors = new Map({ error: action.errors.error, msg: action.errors.msg });
  return state.withMutations(s => s.set('isFetching', false).set('status', errors));
};

const _setStatus = (state, action) => {
  const payloads = new Map({ status: action.payloads.status, option: action.payloads.option });
  return state.mergeIn(['detail', 'order'], payloads);
};

const getDoneLists = (state, action) => {
  return state.withMutations(s =>
    s.set('isFetching', false).set('doneLists', fromJS(action.lists))
  );
};

export const order = (state = new StateRecord(), action) => {
  switch (action.type) {
    case 'order/FETCH_ORDER_LISTS':
    case 'order/FETCH_ORDER_DETAIL':
    case 'order/FETCH_PROCESS_DONE':
      return state.set('isFetching', true);
    case 'order/FETCH_ORDER_LISTS_SUCCESS':
      return getNewLists(state, action);
    case 'order/FETCH_ORDER_DETAIL_SUCCESS':
      return state.set('detail', fromJS(action.order));
    case 'order/FETCH_PROCESS_DONE_SUCCESS':
      return getDoneLists(state, action);
    case 'order/FETCH_ORDER_LISTS_ERROR':
    case 'order/FETCH_ORDER_DETAIL_ERROR':
    case 'order/FETCH_PROCESS_DONE_ERROR':
      return errorOnFetching(state, action);
    case 'order/SET_STATUS':
      return _setStatus(state, action);
    case 'firebase/RECEIVE_MESSAGE':
      return state.set('popupVisible', !state.get('popupVisible'));
    default:
      return state;
  }
};

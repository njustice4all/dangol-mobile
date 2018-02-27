import { LOGIN } from '../constants';
import getFormData from '../utils/getFormData';

const headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
});

export const apiInitSignin = payload => {
  return fetch(LOGIN, {
    method: 'POST',
    headers,
    body: getFormData({ id: 'tiba', pw: 'test1234' }),
  });
};

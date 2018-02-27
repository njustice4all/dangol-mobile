// @flow

import React from 'react';
import { Linking, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

type DispatcherType = (
  msg: {
    type: string,
    payload: {
      type: string,
      uri: string,
      user: Object,
    },
  },
  dispatch: (Object) => void,
  navigation: Object,
  callback: () => void
) => ?Promise<void>;

class ActionDispatcher {
  dispatcher: DispatcherType = async (msg, dispatch, navigation, callback) => {
    const navigateTo = routeName => {
      navigation.dispatch(NavigationActions.navigate({ routeName }));
    };

    if (msg.payload.type === 'ui/OPEN_POPUP' && msg.payload.ui === 'sideMenu') {
      callback();
    }

    switch (msg.payload.type) {
      case 'ceo/NAVIGATE_TO_SHOP':
        // Linking.openURL(msg.payload.uri).catch(err => console.error('An error occurred', err));
        navigateTo('User');
        break;
      case 'auth/REQ_SIGNIN_SUCCESS':
        try {
          const { id, autoLogin } = msg.payload.user;

          if (autoLogin) {
            await AsyncStorage.setItem('user', JSON.stringify({ id, autoLogin }));
          } else {
            AsyncStorage.clear();
          }
        } catch (error) {
          console.log(error);
        }

        break;
    }

    dispatch(msg.payload);
  };
}

export const PostMessageActionDispatcher = new ActionDispatcher();

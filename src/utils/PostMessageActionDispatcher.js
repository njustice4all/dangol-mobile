// @flow

import React from 'react';
import { Linking, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import FCM from 'react-native-fcm';

type DispatcherType = (
  msg: {
    type: string,
    payload: {
      type: string,
      uri: string,
      user: Object,
      info: Object,
    },
  },
  dispatch: (Object) => void,
  navigation: Object,
  topic: string,
  callback: () => void
) => ?Promise<void>;

class ActionDispatcher {
  dispatcher: DispatcherType = async (msg, dispatch, navigation, topic, callback) => {
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
            await AsyncStorage.setItem('user', JSON.stringify({ ...msg.payload.info }));
          } else {
            // AsyncStorage.clear();
            // AsyncStorage.removeItem('user');
          }
        } catch (error) {
          console.log(error);
        }

        break;
      case '@@router/GO_BACK':
        navigation.goBack();
        break;
      case 'auth/LOGOUT':
        // FCM.unsubscribeFromTopic(`/topics/${topic}`);
        break;
    }

    dispatch(msg.payload);
  };
}

export const PostMessageActionDispatcher = new ActionDispatcher();

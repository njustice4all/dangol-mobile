import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';

import FCM, { FCMEvent } from 'react-native-fcm';

import { registerKilledListener, registerAppListener } from './FCM.Listener';
import { setToken } from './actions/fcm';

registerKilledListener();

class FCMController extends Component {
  componentDidMount = async () => {
    registerAppListener();

    try {
      const result = await FCM.requestPermissions({ badge: false, sound: true, alert: true });
      console.log('permission result: ', result);
    } catch (e) {
      console.error(e);
    }

    FCM.getFCMToken().then(token => {
      this.props.setToken(token);
    });

    if (Platform.OS === 'ios') {
      FCM.getAPNSToken().then(token => {
        console.log('APNS TOKEN (getFCMToken)', token);
      });
    }

    FCM.subscribeToTopic('/topics/tiba-manage');
  };

  render() {
    return this.props.children;
  }
}

export default connect(null, dispatch => ({
  setToken: token => dispatch(setToken(token)),
}))(FCMController);

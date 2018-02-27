import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { connect } from 'react-redux';

import FCM, { FCMEvent } from 'react-native-fcm';

import { registerKilledListener, registerAppListener } from './FCM.Listener';
import { setToken, receiveMessage } from './actions/fcm';

registerKilledListener();

class FCMController extends Component {
  componentDidMount = async () => {
    registerAppListener(this.props.receiveMessage);

    try {
      const result = await FCM.requestPermissions({ badge: false, sound: true, alert: true });
      console.log('permission result: ', result);
    } catch (e) {
      console.error(e);
    }

    FCM.getFCMToken().then(token => {
      console.log(token);
      this.props.setToken(token);
    });

    if (Platform.OS === 'ios') {
      FCM.getAPNSToken().then(token => {
        console.log('APNS TOKEN (getFCMToken)', token);
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.topic !== this.props.topic) {
      FCM.subscribeToTopic(`/topics/${nextProps.topic}`);
    }
  };

  render() {
    return this.props.children;
  }
}

export default connect(
  state => ({
    topic: state.getIn(['auth', 'topic']),
  }),
  dispatch => ({
    setToken: token => dispatch(setToken(token)),
    receiveMessage: () => dispatch(receiveMessage()),
  })
)(FCMController);

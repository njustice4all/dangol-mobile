import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { connect } from 'react-redux';
import Sound from 'react-native-sound';
import FCM, { FCMEvent } from 'react-native-fcm';

import { registerKilledListener, registerAppListener } from './FCM.Listener';
import { setToken, receiveMessage } from './actions/fcm';

registerKilledListener();

class FCMController extends Component {
  componentDidMount = async () => {
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

    Sound.setCategory('Ambient');
    this.alarm = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.topic !== this.props.topic) {
      registerAppListener(this.props.receiveMessage, nextProps.webview, this.alarm);
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

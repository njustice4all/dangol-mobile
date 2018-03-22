import React, { Component } from 'react';
import { Platform, View, AsyncStorage } from 'react-native';
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

    this.alarm = null;

    if (Platform.OS === 'android') {
      Sound.setCategory('Ambient');
      this.alarm = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.topic && nextProps.push) {
      console.log('구독');
      FCM.subscribeToTopic(`/topics/${nextProps.topic}`);
    } else if (!nextProps.push) {
      console.log('해지');
      FCM.unsubscribeFromTopic(`/topics/${nextProps.topic}`);
    }

    if (this.props.webview !== nextProps.webview) {
      registerAppListener(this.props.receiveMessage, nextProps.webview, this.alarm);
    }
  };

  componentWillUnmount = () => {
    console.log('kill listener here?');
  };

  render() {
    return null;
  }
}

export default connect(
  state => ({
    topic: state.getIn(['auth', 'topic']),
    push: state.getIn(['setting', 'push']),
  }),
  dispatch => ({
    setToken: token => dispatch(setToken(token)),
    receiveMessage: () => dispatch(receiveMessage()),
  })
)(FCMController);

import React, { Component } from 'react';
import { View, WebView, StatusBar, BackHandler, Platform } from 'react-native';
import { connect } from 'react-redux';
import WebViewAndroid from 'react-native-webview-android';
import { NavigationActions } from 'react-navigation';

import { CEO } from '../../constants';

class UserWebview extends Component {
  componentDidMount = () => {
    if (Platform === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this._back);
    }
  };

  componentWillUnmount = () => {
    if (Platform === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this._back);
    }
  };

  _back = () => {
    const { navigation, getMembers } = this.props;
    navigation.goBack();
    getMembers();
    return true;
  };

  render() {
    const auth = this.props.auth.toJS();
    const uri =
      CEO + '?siteId=' + auth.siteId + '&session=' + auth.session + '&userId=' + auth.siteUserId;

    if (Platform.OS === 'ios') {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={false} backgroundColor={'#505050'} />
          <WebView
            ref={webview => (this.webview = webview)}
            source={{ uri }}
            startInLoadingState
            scalesPageToFit={false}
            javaScriptEnabled
            bounces={false}
            style={{ flex: 1 }}
          />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} backgroundColor={'#505050'} />
        <WebViewAndroid
          ref={webview => (this.webview = webview)}
          source={{ uri }}
          startInLoadingState
          scalesPageToFit={false}
          javaScriptEnabled
          bounces={false}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    name: state.getIn(['auth', 'name']),
    auth: state.get('auth'),
  }),
  dispatch => ({
    getMembers: () => dispatch({ type: 'web/GET_MEMBERS' }),
  })
)(UserWebview);

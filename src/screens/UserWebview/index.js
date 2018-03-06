import React, { Component } from 'react';
import { View, WebView, StatusBar, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import WebViewAndroid from 'react-native-webview-android';
import { NavigationActions } from 'react-navigation';

import { CEO } from '../../constants';

class UserWebview extends Component {
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this._back);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._back);
  };

  _back = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    const auth = this.props.auth.toJS();
    const uri =
      CEO + '?siteId=' + auth.siteId + '&session=' + auth.session + '&userId=' + auth.siteUserId;

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
}

export default connect(state => ({
  name: state.getIn(['auth', 'name']),
  auth: state.get('auth'),
}))(UserWebview);

import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { connect } from 'react-redux';
import WebViewAndroid from 'react-native-webview-android';

import { CEO } from '../../constants';

class UserWebview extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebViewAndroid
          ref={webview => (this.webview = webview)}
          source={{ uri: CEO }}
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

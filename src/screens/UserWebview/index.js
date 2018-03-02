import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import WebViewAndroid from 'react-native-webview-android';

import { CEO } from '../../constants';

class UserWebview extends Component {
  // componentDidMount = () => {
  //   const auth = this.props.auth.toJS();

  //   this.webview.postMessage(
  //     JSON.stringify({
  //       payload: {
  //         type: 'auth/SET_AUTH_FROM_MOBILE',
  //         payload: { ...auth },
  //       },
  //     })
  //   );
  // };

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

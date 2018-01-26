import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { connect } from 'react-redux';

class UserWebview extends Component {
  render() {
    console.log('id', this.props.name);

    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={webview => (this.webview = webview)}
          source={{ uri: 'https://m.naver.com' }}
        />
      </View>
    );
  }
}

export default connect(state => ({
  name: state.getIn(['auth', 'name']),
}))(UserWebview);

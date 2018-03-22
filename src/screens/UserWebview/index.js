import React, { Component } from 'react';
import { View, WebView, StatusBar, BackHandler, Platform, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import WebViewAndroid from 'react-native-webview-android';
import { NavigationActions } from 'react-navigation';

import SafeAreaBottom from '../../components/SafeAreaBottom';

import { CEO } from '../../constants';

class UserWebview extends Component {
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this._back);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._back);
  };

  _back = () => {
    const { navigation, getMembers } = this.props;
    getMembers();
    navigation.goBack();
    return true;
  };

  _onMessage = event => {
    const msg = JSON.parse(event.nativeEvent.data);
    if (msg.payload.type === '@@router/GO_BACK') {
      this.props.navigation.goBack();
    }
  };

  render() {
    const auth = this.props.auth.toJS();
    const uri =
      CEO + '?siteId=' + auth.siteId + '&session=' + auth.session + '&userId=' + auth.siteUserId;

    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <StatusBar hidden={Platform.OS === 'ios' ? false : true} />
            <WebView
              ref={webview => (this.webview = webview)}
              source={{ uri }}
              startInLoadingState
              scalesPageToFit={false}
              javaScriptEnabled
              bounces={false}
              onMessage={this._onMessage}
              style={{ flex: 1 }}
            />
          </View>
          <SafeAreaBottom />
        </SafeAreaView>
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

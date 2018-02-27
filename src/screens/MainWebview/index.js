import React, { Component } from 'react';
import {
  View,
  WebView,
  ActivityIndicator,
  StatusBar,
  DrawerLayoutAndroid,
  AsyncStorage,
  Platform,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import PostMessageController from '../../PostMessageController';
import FCMController from '../../FCM.Controller';
import SideMenu from '../../components/SideMenu';

import { registerKilledListener } from '../../FCM.Listener';
import { URI } from '../../constants';

class MainWebview extends Component<{}> {
  state = {
    uri: URI,
    isLoading: true,
  };

  componentDidMount = () => {
    // const auth = this.props.auth.toJS();
    // this.webview.postMessage(
    //   JSON.stringify({
    //     payload: {
    //       type: 'auth/SET_AUTH_FROM_MOBILE',
    //       payload: { ...auth },
    //     },
    //   })
    // );
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.drawer) {
      // this.drawer.openDrawer();
    }
  };

  _onNavigationStateChange = event => this.setState({ isLoading: event.loading });

  onChangeRoute = route => () => {
    this.webview.postMessage(
      JSON.stringify({
        type: '@@router/LOCATION_CHANGE',
        payload: { route },
      })
    );

    this.drawer.closeDrawer();
  };

  onLogout = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Auth' })],
    });

    this.props.navigation.dispatch(resetAction);
  };

  goUserWebview = () => {
    this.props.navigation.navigate('User');
  };

  render() {
    const { uri, isLoading } = this.state;
    const { _onMessage, fetching, closeDrawer, navigation, auth } = this.props;

    const Loading = () => {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#fe931f" size="large" animating={isLoading} />
        </View>
      );
    };

    return (
      <DrawerLayoutAndroid
        ref={drawer => (this.drawer = drawer)}
        drawerWidth={265}
        onDrawerClose={closeDrawer}
        drawerLockMode="locked-closed"
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => (
          <SideMenu
            drawer={this.drawer}
            onChangeRoute={this.onChangeRoute}
            onLogout={this.onLogout}
            goUserWebview={this.goUserWebview}
          />
        )}>
        <View style={{ flex: 1 }}>
          <StatusBar hidden />
          <FCMController topic={auth.get('topic')} webview={this.webview}>
            <WebView
              ref={webview => (this.webview = webview)}
              source={{ uri }}
              startInLoadingState
              renderLoading={Loading}
              scalesPageToFit={false}
              javaScriptEnabled
              bounces={false}
              onMessage={_onMessage}
              onNavigationStateChange={this._onNavigationStateChange}
              style={{ flex: 1 }}
            />
          </FCMController>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

export default PostMessageController(MainWebview);

import React, { Component } from 'react';
import {
  View,
  WebView,
  ActivityIndicator,
  StatusBar,
  DrawerLayoutAndroid,
  AsyncStorage,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import PostMessageController from '../../PostMessageController';
import SideMenu from '../../components/SideMenu';

import { registerKilledListener } from '../../FCM.Listener';
import { URI } from '../../constants';

class MainWebview extends Component<{}> {
  state = {
    uri: URI,
    isLoading: true,
  };

  // TODO: 자동로그인시 유저정보와 coords데이터 가져와야함
  componentDidMount = async () => {
    const user = await AsyncStorage.getItem('user');
    const parseUser = JSON.parse(user);

    if (parseUser) {
      console.log(parseUser);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.drawer) {
      this.drawer.openDrawer();
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
    const { _onMessage, fetching, closeDrawer, navigation } = this.props;

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
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

export default PostMessageController(MainWebview);

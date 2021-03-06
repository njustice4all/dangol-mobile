import React, { Component } from 'react';
import {
  View,
  WebView,
  ActivityIndicator,
  StatusBar,
  // DrawerLayoutAndroid,
  Platform,
  BackHandler,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import PostMessageController from '../../PostMessageController';
import FCMController from '../../FCM.Controller';
import SideMenu from '../../components/SideMenu';
import SafeAreaBottom from '../../components/SafeAreaBottom';

import { registerKilledListener } from '../../FCM.Listener';
import { URI } from '../../constants';

class MainWebview extends Component<{}> {
  state = {
    uri: URI,
    isLoading: true,
    backPressTime: 0,
  };

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this._back);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.authentication.getMembers === true) {
      this.webview.postMessage(
        JSON.stringify({
          type: 'web/GET_MEMBERS',
          payload: this.props.auth.get('siteId'),
        })
      );
      this.props.resetMembers();
    }

    if (nextProps.drawer) {
      // this.drawer.openDrawer();
    }
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._back);
  };

  _back = () => {
    const { router: { location } } = this.props;
    const now = new Date();

    if (!location || location.pathname.split('/').includes('order') || location.pathname === '/') {
      ToastAndroid.show('종료하시려면 한번 더 누르세요!', ToastAndroid.SHORT);

      if (now.getTime() - this.state.backPressTime < 1500) {
        BackHandler.exitApp();
      }
    } else {
      this.webview.postMessage(JSON.stringify({ type: '@@router/GO_BACK' }));
    }

    this.setState({ backPressTime: now.getTime() });
    return true;
  };

  _onNavigationStateChange = event => {
    this.setState({ isLoading: event.loading });
  };

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
    const {
      _onMessage,
      fetching,
      closeDrawer,
      navigation,
      auth,
      router: { location },
    } = this.props;

    let backgroundColor = '#505050';
    if (location === null || location.pathname === '/') {
      backgroundColor = '#fff';
    }

    const Loading = () => {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#fe931f" size="large" animating={isLoading} />
        </View>
      );
    };

    const drawer = {
      /*<DrawerLayoutAndroid
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
      </DrawerLayoutAndroid>*/
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <View style={{ flex: 1 }}>
          <StatusBar hidden={Platform.OS === 'ios' ? false : true} />
          <FCMController topic={auth.get('topic')} webview={this.webview} />
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
        <SafeAreaBottom />
      </SafeAreaView>
    );
  }
}

export default PostMessageController(MainWebview);

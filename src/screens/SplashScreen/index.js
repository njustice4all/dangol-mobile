import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { initialApp } from '../../actions/auth';

class SplashScreen extends Component {
  componentDidMount = () => {
    // TODO:
    // initialApp(set token, loading) 해야함
    this.props.initialApp();
    this.timeout = setTimeout(() => {
      this.afterInitialized();
    }, 2000);
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  afterInitialized = () => {
    const navigateTo = routeName => {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })],
      });

      this.props.navigation.dispatch(actionToDispatch);
    };

    if (this.props.authentication.isLogin) {
      navigateTo('Main');
    } else {
      navigateTo('Auth');
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>앱 로딩</Text>
      </View>
    );
  }
}

export default connect(
  state => ({
    authentication: state.get('authentication'),
  }),
  dispatch => ({
    initialApp: () => dispatch(initialApp()),
  })
)(SplashScreen);

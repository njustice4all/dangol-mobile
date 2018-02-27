import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { initialApp } from '../../actions/auth';

class SplashScreen extends Component {
  componentDidMount = () => {
    // TODO:
    // initialApp(set token, loading) 해야함
    // initialApp() 대신 token받아오고 몇초후에 afterInitialized실행 - good
    this.props.initialApp();
    this.timeout = setTimeout(() => {
      this.afterInitialized();
    }, 1500);
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
  };

  afterInitialized = () => {
    const navigateTo = routeName => {
      this.props.navigation.dispatch(NavigationActions.navigate({ routeName }));
    };

    // if (this.props.authentication.isLogin) {
    //   navigateTo('Main');
    // } else {
    //   navigateTo('Auth');
    // }

    navigateTo('Main');
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar hidden />
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

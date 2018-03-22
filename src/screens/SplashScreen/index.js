import React, { Component } from 'react';
import { View, Text, StatusBar, Image, AsyncStorage, Platform, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { initialApp } from '../../actions/auth';

class SplashScreen extends Component {
  componentDidMount = async () => {
    // TODO:
    // initialApp(set token, loading) 해야함
    // initialApp() 대신 token받아오고 몇초후에 afterInitialized실행 - good

    await AsyncStorage.getItem('user').then(info => {
      if (info) {
        const userInfo = JSON.parse(info);

        this.props.addTopic(userInfo.topic);
      }
    });

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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fe931f' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar hidden={Platform.OS === 'ios' ? false : true} />
          <Image source={require('./loading.png')} style={{ width: '100%', height: '100%' }} />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    authentication: state.get('authentication'),
  }),
  dispatch => ({
    initialApp: () => dispatch(initialApp()),
    addTopic: topic => dispatch({ type: 'auth/ADD_TOPIC', topic }),
  })
)(SplashScreen);

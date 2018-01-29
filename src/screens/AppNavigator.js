import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { View, Animated, Easing } from 'react-native';

import SplashScreen from './SplashScreen';
import Auth from './Auth';
import MainWebview from './MainWebview';
import UserWebview from './UserWebview';

const Root = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      },
    },
    Auth: {
      screen: Auth,
      navigationOptions: {
        title: '로그인',
        headerStyle: {
          backgroundColor: '#505050',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: 'white',
          alignSelf: 'center',
          fontWeight: '100',
          fontSize: 18,
        },
      },
    },
    Main: {
      screen: MainWebview,
      navigationOptions: {
        header: null,
      },
    },
    User: {
      screen: UserWebview,
      navigationOptions: {
        title: '업소 정보 수정',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#505050',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontWeight: '100',
          fontSize: 18,
        },
      },
    },
  },
  {
    headerMode: 'screen',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 400,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateX }] };
      },
    }),
  }
);

class AppNavigator extends Component {
  render() {
    const { dispatch, nav } = this.props;

    const screenProps = {};
    const navigation = addNavigationHelpers({ dispatch, state: nav });

    return (
      <View style={{ flex: 1 }}>
        <Root navigation={navigation} screenProps={screenProps} />
      </View>
    );
  }
}

export default connect(state => ({
  nav: state.get('nav'),
}))(AppNavigator);

export const router = Root.router;

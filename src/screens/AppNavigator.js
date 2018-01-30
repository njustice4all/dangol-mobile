import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { View, Animated, Easing } from 'react-native';

import SplashScreen from './SplashScreen';
import Auth from './Auth';
import MainWebview from './MainWebview';
import UserWebview from './UserWebview';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      });

      return { transform: [{ translateX }] };
    },
  };
};

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
        header: null,
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
    transitionConfig,
    // transitionConfig: () => ({
    //   transitionSpec: {
    //     duration: 500,
    //   },
    //   screenInterpolator: sceneProps => {
    //     const { layout, position, scene } = sceneProps;
    //     const { index } = scene;

    //     const width = layout.initWidth;
    //     const translateX = position.interpolate({
    //       inputRange: [index - 1, index, index + 1],
    //       outputRange: [width, 0, 0],
    //     });

    //     const opacity = position.interpolate({
    //       inputRange: [index - 1, index - 0.99, index],
    //       outputRange: [0, 1, 1],
    //     });

    //     return { opacity, transform: [{ translateX }] };
    //   },
    // }),
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

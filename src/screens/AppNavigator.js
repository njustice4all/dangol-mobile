import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { View, Animated, Easing } from 'react-native';

import Auth from './Auth';
import MainWebview from './MainWebview';
import UserWebview from './UserWebview';

const Root = StackNavigator(
  {
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

const AUTOLOGIN = true;

class AppNavigator extends Component {
  render() {
    const screenProps = {};

    // const state = AUTOLOGIN
    //   ? Root.router.getStateForAction(Root.router.getActionForPathAndParams('Main'))
    //   : Root.router.getStateForAction(Root.router.getActionForPathAndParams('Auth'));

    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      // state: state,
      state: this.props.nav,
    });

    return (
      <View style={{ flex: 1 }}>
        <Root navigation={nav} screenProps={screenProps} />
      </View>
    );
  }
}

export default connect(state => ({
  nav: state.get('nav'),
}))(AppNavigator);

export const router = Root.router;

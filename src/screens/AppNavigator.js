import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';

import SplashScreen from './SplashScreen';
import Auth from './Auth';
import MainWebview from './MainWebview';
import UserWebview from './UserWebview';
import Back from '../components/Back';
import CustomHeader from '../components/CustomHeader';

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
      navigationOptions: ({ navigation }) => ({
        header: Platform.OS === 'ios' ? <CustomHeader navigation={navigation} /> : null,
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
        headerLeft: <Back navigation={navigation} />,
      }),
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
    const { dispatch, nav, isModalVisible } = this.props;

    const screenProps = {};
    const navigation = addNavigationHelpers({ dispatch, state: nav });

    return (
      <View style={{ flex: 1 }}>
        <Root navigation={navigation} screenProps={screenProps} />
        <Modal isVisible={isModalVisible}>
          <StatusBar hidden />
          <View style={{ width: 322, backgroundColor: 'white', alignSelf: 'center' }}>
            <View style={{ padding: 20 }}>
              <Image style={{ width: 322, height: 337 }} source={require('./popup.png')} />
            </View>
            <View
              style={{
                backgroundColor: '#fe931f',
                position: 'absolute',
                width: '100%',
                bottom: 0,
                padding: 20,
              }}>
              <TouchableOpacity
                onPress={() => dispatch({ type: 'firebase/RECEIVE_MESSAGE' })}
                style={{ width: '100%', height: '100%' }}>
                <View>
                  <Text style={{ color: 'white', alignSelf: 'center' }}>확인</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(state => ({
  nav: state.get('nav'),
  isModalVisible: state.getIn(['order', 'popupVisible']),
}))(AppNavigator);

export const router = Root.router;

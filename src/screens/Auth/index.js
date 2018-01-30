import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableNativeFeedback,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './styles';

class Auth extends Component {
  onLogin = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Main',
      })
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.inner}>
            <View>
              <TextInput
                placeholder="아이디"
                underlineColorAndroid="transparent"
                style={styles.textInput}
              />
            </View>
            <View>
              <TextInput
                placeholder="비밀번호"
                underlineColorAndroid="transparent"
                secureTextEntry
                style={styles.textInput}
              />
            </View>
            <TouchableNativeFeedback
              onPress={this.onLogin}
              background={TouchableNativeFeedback.SelectableBackground()}>
              <View style={styles.button}>
                <Text style={styles.text}>로그인</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Auth;

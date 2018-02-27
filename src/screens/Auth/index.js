import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableNativeFeedback,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { initSignin } from '../../actions/auth';
import styles from './styles';

class Auth extends Component {
  onLogin = async () => {
    const { navigation, initSignin } = this.props;
    const id = this.id._lastNativeText;
    const pw = this.pw._lastNativeText;

    initSignin({ id: 'tiba', pw: 'test1234' }).then(result => {
      if (result.isLogin) {
        navigation.dispatch(NavigationActions.navigate({ routeName: 'Main' }));
      }
    });
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
                ref={id => (this.id = id)}
              />
            </View>
            <View>
              <TextInput
                placeholder="비밀번호"
                underlineColorAndroid="transparent"
                secureTextEntry
                style={styles.textInput}
                ref={pw => (this.pw = pw)}
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
          <Image
            style={{ width: 249, height: 347, position: 'absolute', bottom: -100, right: 0 }}
            source={require('./main.png')}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(null, dispatch => ({
  initSignin: user => dispatch(initSignin(user)),
}))(Auth);

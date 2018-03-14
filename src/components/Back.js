import React, { Component } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';

import { IconBack } from './Icons';

class Back extends Component {
  _onPress = () => {
    const { navigation, getMembers } = this.props;
    getMembers();
    navigation.goBack();
  };

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this._onPress}
        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)', true)}>
        <View style={{ width: 50, paddingLeft: 10 }}>
          <IconBack size={30} />
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default connect(null, dispatch => ({
  getMembers: () => dispatch({ type: 'web/GET_MEMBERS' }),
}))(Back);

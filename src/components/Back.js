import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity onPress={this._onPress}>
        <View style={{ width: 50, paddingLeft: 10 }}>
          <IconBack size={30} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, dispatch => ({
  getMembers: () => dispatch({ type: 'web/GET_MEMBERS' }),
}))(Back);

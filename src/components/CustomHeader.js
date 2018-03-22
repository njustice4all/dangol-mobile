import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import Back from './Back';

const CustomHeader = ({ navigation }) => (
  <SafeAreaView style={{ backgroundColor: '#505050' }}>
    <View
      style={{
        height: 54,
        backgroundColor: '#505050',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{ width: 50, position: 'absolute', left: 0, zIndex: 99 }}>
        <Back navigation={navigation} />
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>업소 정보 수정</Text>
      </View>
    </View>
  </SafeAreaView>
);

export default CustomHeader;

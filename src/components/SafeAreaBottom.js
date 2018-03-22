import React from 'react';
import { View } from 'react-native';

const SafeAreaBottom = () => (
  <View
    style={{
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      height: 100,
      zIndex: -1000,
    }}
  />
);

export default SafeAreaBottom;

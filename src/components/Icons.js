import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

export const IconShop = ({ size = 12 }) => <Entypo name="shop" size={size} color="white" />;

export const IconSetting = ({ size = 12 }) => (
  <Ionicons name="ios-settings" size={size} color="white" />
);

export const IconChat = ({ size = 12 }) => (
  <Ionicons name="ios-chatbubbles-outline" size={size} color="white" />
);

export const IconBell = ({ size = 12 }) => <Octicons name="bell" size={size} color="white" />;

export const IconPerson = ({ size = 12 }) => <Octicons name="person" size={size} color="white" />;

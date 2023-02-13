import { TouchableHighlight } from 'react-native';
import ArrowBack from 'climbingapp/src/assets/icon/ic_24_appbar_back_gray800.svg';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export const Back = () => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={{ width: 24, height: 24 }}
      onPress={() => navigation.goBack()}
      underlayColor="transparent"
    >
      <ArrowBack />
    </TouchableHighlight>
  );
};

import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import React from 'react';

const SkipText = styled.Text`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  font-style: normal;
`;

interface SkipProps {
  onPress: () => void;
}

export const Skip = ({ onPress }: SkipProps) => {
  return (
    <>
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <SkipText>건너뛰기</SkipText>
      </TouchableHighlight>
    </>
  );
};

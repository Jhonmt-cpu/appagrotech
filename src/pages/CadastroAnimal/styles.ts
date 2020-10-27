import styled from 'styled-components/native';

import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Form as Unform } from '@unform/mobile';

export const Container = styled.View`
  padding: 0 0 ${Platform.OS === 'android' ? 150 : 40}px;
  background-color: #f0f0f0;
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  width: 100%;
  padding-top: ${getStatusBarHeight() + 24}px;
  margin-bottom: 50px;
  background: #74d469;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  margin-left: 16px;
  font-weight: bold;
`;

export const Form = styled(Unform)`
  width: 100%;
  padding: 10px;
`;

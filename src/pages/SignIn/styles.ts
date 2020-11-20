import styled from 'styled-components/native';
import { Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  margin-top: ${getStatusBarHeight() + 20}px;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #ae3a20;
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #35aaff;
  font-size: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #74d469;
  border-top-width: 1px;
  border-color: #74d469;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  font-size: 18px;
`;

import { Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px ${Platform.OS === 'android' ? 60 : 40}px;
  background: #fff;
`;

export const InfoContainer = styled.View`
  margin: 24px 0;
  padding: 24px 24px 0 24px;
  width: 100%;
  border: 1px solid #74d469;
  border-radius: 20px;
`;

export const Line = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const DataOne = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #74d469;
`;

export const DataTwo = styled.Text`
  font-weight: bold;
  font-size: 18px;
  max-width: 50%;
`;

export const AnotacoesContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
  border: #74d469 solid 1px;
  padding: 20px;
  border-radius: 20px;
`;

export const AnotacoesText = styled.Text`
  color: #74d469;
  font-weight: bold;
  font-size: 14px;
`;

export const RegisterDoencaButton = styled.TouchableOpacity`
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

export const RegisterDoencaButtonText = styled.Text`
  font-size: 18px;
`;

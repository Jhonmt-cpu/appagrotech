import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: ${getStatusBarHeight() + 20}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const LogoImg = styled.Image`
  margin-bottom: 50px;
  width: 200px;
  height: 200px;
  align-self: center;
`;

export const Message = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

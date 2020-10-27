import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 24px;
  width: 100%;
  padding-top: ${getStatusBarHeight() + 24}px;
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

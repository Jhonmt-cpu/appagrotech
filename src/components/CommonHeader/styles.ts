import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

interface ContainerProps {
  hasBackIcon: boolean;
}

export const Container = styled.View<ContainerProps>`
  padding: 24px;
  width: 100%;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #74d469;

  flex-direction: row;
  justify-content: ${props => (props.hasBackIcon ? 'space-between' : 'center')};
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  width: 300px;
  text-align: right;
  font-size: 20px;
  margin-left: 16px;
  font-weight: bold;
`;

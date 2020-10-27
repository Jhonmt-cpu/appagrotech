import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  background: #74d469;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const MenuTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

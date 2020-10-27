import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;

  background: #74d469;
  border-radius: 20px;
  padding: 16px 0 16px;
`;

export const ButtonText = styled.Text`
  color: #000;
  font-size: 16px;
`;

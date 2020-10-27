import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Form = styled(Unform)`
  width: 100%;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 70px;
  margin-bottom: 30px;
`;

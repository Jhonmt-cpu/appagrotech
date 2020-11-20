import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  margin-top: ${getStatusBarHeight() + 20}px;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Form = styled(Unform)`
  width: 100%;
  align-items: center;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 70px;
  margin-bottom: 30px;
`;
